---
id: metavm
title: MetaVM
sidebar_label: MetaVM
sidebar_position: 2
---

# MetaVM

MetaVM is a modular zero-knowledge proof system that proves the correct execution of programs running inside virtual machines.
It is a network intrinsic of Quilibrium: a capability built directly into the network rather than layered on top as an application.

Instead of trusting a remote party to run code honestly, MetaVM lets any participant produce a compact cryptographic proof that a computation was carried out correctly, which any other participant can verify quickly and cheaply.

MetaVM supports three execution environments: RISC-V (RV64IMAC), the Ethereum Virtual Machine (EVM), and Solana BPF (sBPF).
A single proving framework underlies all three, so the same infrastructure that certifies a Linux kernel boot can also certify an Ethereum block replay or a Solana slot.

MetaVM is written in Rust, licensed under AGPL-3.0, and available at [github.com/QuilibriumNetwork/metavm](https://github.com/QuilibriumNetwork/metavm).

## Why ZK-proven execution matters

Running code on a decentralized network requires solving a fundamental trust problem: how can nodes agree that a computation was done correctly without each one repeating the work?

Traditional approaches either replicate execution across many nodes (expensive) or rely on fraud proofs that challenge incorrect results after the fact (slow and incomplete).
Zero-knowledge proofs offer a third path: the party that runs the code generates a proof alongside the result, and every verifier checks only the proof.
Verification is far cheaper than re-execution, and the proof reveals nothing about private inputs.

Within Quilibrium, this matters because the network hosts arbitrary workloads across many isolated execution environments.
MetaVM provides the cryptographic backbone that makes those workloads trustworthy: any output accompanied by a MetaVM proof can be accepted with the same confidence as if every network participant had re-run the program themselves.

## Architecture

MetaVM is organized as a Cargo workspace with five crates:

```
crates/
  core/    -- field arithmetic, Shamir secret sharing, Fiat-Shamir transcript, VM traits
  zkp/     -- curve-agnostic prover, verifier, KZG commitments, permutation, lookup, recursion
  riscv/   -- RV64IMAC emulator (full Linux boot), trace generation, constraint system, CLI
  evm/     -- EVM executor (revm), RPC client, trace generation, constraint system, CLI
  sbf/     -- Solana BPF executor (solana-rbpf), syscall layer, trace generation, constraint system, CLI
```

**A note on field types**: `crates/core/src/field.rs` defines a `FieldElement` type over `curve25519-dalek::Scalar` (the Ed25519 field).
This type is used only for MPC and secret sharing, not for proving.
The proving scalar field lives in `crates/zkp/src/field.rs` and operates over BLS48-581 or BLS12-381 scalars.
These two `FieldElement` types are distinct and not interchangeable.

**MPC integration**: `mpc_proof.rs` and the Shamir secret sharing in `core/share.rs` indicate that MetaVM is designed to attest to correct MPC execution.
This integration is not yet exposed through the CLI binaries.

## Supported virtual machines

### RISC-V (RV64IMAC)

The RISC-V backend targets RV64IMAC: a 64-bit base integer ISA with multiply/divide, atomic, and compressed instruction extensions.
The emulator supports full Linux boot with SV39 virtual memory, VirtIO block devices, UART output, a CLINT timer, and a Device Tree Blob.

**Constraint system: 84 columns, 128 constraints + 1 shifted constraint**

State and data columns (20 total):

`COL_PC`, `COL_RD`, `COL_RD_VAL_BEFORE`, `COL_RD_VAL_AFTER`, `COL_RS1`, `COL_RS1_VAL`, `COL_RS2`, `COL_RS2_VAL`, `COL_MEM_ADDR`, `COL_MEM_VAL`, `COL_NEXT_PC`, `COL_PRIVILEGE_MODE`, `COL_INSN_TYPE`, `COL_FUNCT`, `COL_IMMEDIATE`, `COL_INSN_LEN`, `COL_AUX0`, `COL_AUX1`, `COL_AUX2`, and `COL_STEP` (skipped, never committed).

Selector columns (64): one per instruction variant.
Examples include `sel_r_alu_add`, `sel_sub`, `sel_and`, `sel_sll`, `sel_mul`, `sel_div`, `sel_load`, `sel_beq`, `sel_amo_swap`, `sel_csr_rw`, and `sel_ecall`.

Constraint breakdown:
- 63 VM constraints (ALU, branches, memory, CSR, system, atomic operations)
- 64 binary selector constraints: `sel × (sel - 1) = 0`
- 1 sum-to-one: all 64 selectors sum to 1 per row
- 1 shifted constraint: next-PC continuity across rows

Key algebraic patterns used in the constraint system:

| Instruction | Constraint form |
|------------|----------------|
| ADD | `rs1 + rs2 = carry × 2^64 + rd` (carry must be binary) |
| SUB | `rd + rs2 = rs1 + borrow × 2^64` |
| MUL | `rs1 × rs2 = aux0 × 2^64 + rd` (high/low split into aux0/rd) |
| DIV | `rd × rs2 + aux0 = rs1` |
| OR | `rs1 + rs2 - aux0` where `aux0 = AND(rs1, rs2)` |
| XOR | `rs1 + rs2 - 2 × aux0` where `aux0 = AND(rs1, rs2)` |
| SLL | `rs1 × aux0 = aux1 × 2^64 + rd` (shift as multiplication) |
| Branch | `(next_pc - taken) × (next_pc - not_taken) = 0` plus condition verification |

The cross-row constraint for PC continuity is: `next_pc(ω·z) - next_pc(z) = 0`.

ISA coverage: RV64IMAC plus privileged instructions, CSR operations, and atomics.
The Compressed (C) extension is fully decoded across all three quadrants (Q0, Q1, Q2).

### EVM (Ethereum Virtual Machine)

The EVM backend uses the `revm` library to execute Ethereum transactions.
State is fetched from any Ethereum-compatible RPC endpoint via `RpcDatabase`, which lazily loads account balances, code, storage slots, and nonces.

256-bit EVM values are decomposed into 4 × 64-bit limbs in little-endian order.

**Constraint system: 77 columns, 106 constraints**

Columns include: `Input0`, `Input1`, `Output0`, `Aux0`, `Aux1` (each as 4 limbs), `MemOffset`, `MemValue` (4 limbs), `PC`, `NextPC`, `Immediate` (4 limbs), and 41 selector columns.
Note: the EVM trace struct tracks 78 columns including the step counter (`NUM_EVM_COLUMNS = 77` plus the always-skipped step column).

Constraint breakdown:
- 64 VM-specific constraints
- 41 binary selector constraints
- 1 sum-to-one constraint

Several EVM operations are handled via oracle witnesses rather than direct polynomial constraints.
KECCAK256, ADDMOD, MULMOD, storage access, and JUMP destination validation are witnessed externally and verified via lookup tables.
This is pragmatic: encoding KECCAK256 algebraically would require thousands of additional constraints.
These operations' correctness relies on the lookup structure rather than the main constraint polynomial.

### Solana BPF (sBPF)

The SBF backend uses `solana-rbpf` to execute Solana programs.
BPF instructions are uniformly 8 bytes wide.
15 syscalls are implemented, including `sol_log`, `sol_memcpy`, `sol_sha256`, and `sol_keccak256`.

**Constraint system: 40 columns, 47 constraints**

Core columns (18): `step`, `PC`, `opcode`, `dst_register`, `dst_val_before`, `dst_val_after`, `src_register`, `src_val`, `mem_addr`, `mem_val`, `next_pc`, `insn_type`, `funct`, `immediate`, `aux0`, `aux1`, `aux2`, and one spare.

Selector columns (22): one per instruction category (ADD, SUB, MOV, MUL, DIV, MOD, AND, OR, XOR, LSH, RSH, ARSH, NEG, LOAD, STORE, branch types, CALL, EXIT).

Constraint breakdown:
- 24 VM constraints
- 22 binary selector constraints
- 1 sum-to-one constraint

All values are 64-bit (not 256-bit, unlike EVM).
Signed comparisons use borrow and sign auxiliary witnesses.

## CLI binaries

All binaries accept `--scheme bls12381|bls48581|bls48581-fast` to select the commitment curve.
Parallel proving binaries also accept `--workers N` (worker thread count) and `--chunk-size N` (steps per chunk).

| Binary | What it does |
|--------|-------------|
| `metavm-run` | RISC-V emulator only, no proof. Boots Linux and logs execution statistics every 5 seconds. |
| `prove-elf` | Proves a standalone RISC-V ELF binary. Args: `<elf-file> [--chunk-size N] [--max-steps N] [--workers N] [--output F]` |
| `prove-boot` | Proves a full Linux kernel boot. `--trace-file` streams chunks to disk to avoid OOM on long boot sequences. Progress logged every 10 seconds. |
| `prove-evm` | Demo: deploys a counter contract, proves execution, verifies, prints timing. |
| `prove-block` | Fetches an Ethereum block via RPC and replays all transactions with tracing, then proves the merged trace. Args: `<rpc_url> <block_number>` |
| `prove-sbf` | Proves a Solana BPF ELF or inline assembly. Default demo computes `10 + 20`. |
| `prove-slot` | Fetches a Solana slot, fetches all referenced BPF program ELFs (with local caching), executes and proves all transactions. Args: `<rpc_url> <slot>` |

**Usage examples:**

```bash
# Prove a RISC-V ELF, 4 parallel workers, 1M steps per chunk
prove-elf my_program.elf --workers 4 --chunk-size 1000000 --output proof.bin

# Prove an Ethereum block from a public RPC
prove-block https://eth-mainnet.example.com 21000000 --workers 8

# Prove a Solana slot
prove-slot https://api.mainnet-beta.solana.com 250000000

# Boot a Linux kernel and prove execution (streams chunks to disk)
prove-boot bzImage --initrd initrd.gz --trace-file chunks.bin --workers 4
```

The parallel proving architecture used by `prove-elf`, `prove-boot`, `prove-block`, and `prove-slot` follows a pipeline:

1. A bounded work queue feeds chunks to N worker threads.
2. Each worker thread proves one chunk independently.
3. A reordering stage ensures chunks enter the folder in sequential order.
4. A dedicated folder thread runs the binary tree folding.

Ctrl+C interrupts program execution gracefully; the prover continues to prove any chunks already collected.

## The proving pipeline

MetaVM uses a Polynomial IOP (Interactive Oracle Proof) scheme.
Execution traces become matrices of field elements, encoded as polynomial evaluations over a roots-of-unity domain and committed via KZG polynomial commitments.
The prover never interacts with the verifier in real time; all challenges are derived deterministically from prior commitments using a Fiat-Shamir transcript (SHA3-256 based).

Long executions are split into fixed-size chunks and folded with binary-tree accumulation, keeping proof size and verification cost roughly constant regardless of how long the program runs.

### Phase 1: execution and trace collection

The VM executes the target program in chunks of `chunk_size` steps (configurable per run).
A `StreamingProver` wraps each VM backend and collects a structured trace:

- **RISC-V**: a `TracingVm` wraps the emulator and records one `TraceRow` per instruction.
After `chunk_size` steps, `end_trace()` returns a `TraceColumns` struct.
- **EVM**: a `TracingInspector` implements revm's `Inspector` trait, hooking into `step()` (pre-execution) and `step_end()` (post-execution) to capture one `EvmTraceRow` per opcode.
- **SBF**: `solana_rbpf`'s built-in tracing is post-processed into `SbfTraceColumns`.

At every chunk boundary, the prover hashes the complete machine state using `IncrementalMemoryHash`: each 4 KB memory page has its SHA3-256 hash cached, and on update only dirty pages are re-hashed.
The total memory hash is SHA3-256 over all sorted page hashes.
The resulting `ChunkBoundaryState` captures the program counter, 32 registers, privilege mode, 20 CSRs, memory hash, UART output hash, CLINT timer values, and step number.

### Phase 2: trace polynomial construction

`TracePolynomials::from_vm_trace()` converts the raw trace into polynomial form:

- Column 0 (step counter) is always skipped and never committed.
- Remaining columns become evaluation vectors padded to the next power of 2 (minimum 16).
- `fix_selector_padding()` sets exactly one selector to 1 in each padded row.
This is required for the sum-to-one constraint to hold across the full domain.
Getting this wrong silently breaks verification, so it is a non-negotiable invariant of trace construction.

### Phase 3: KZG commitment

Each trace column polynomial is committed via KZG.
The prover converts from evaluation form to monomial form via IFFT, then commits the result.

Two elliptic curves are supported:

| Curve | Commitment size | Security level | Ceremony |
|-------|----------------|----------------|---------|
| BLS48-581 | 74-byte compressed G1 point | ~286-bit (embedding degree 48) | Quilibrium's own ceremony |
| BLS12-381 | 48-byte G1 point | ~128-bit | Ethereum EIP-4844 ceremony (4,096 G1 points, compiled into the binary) |

BLS48-581 is the primary curve for Quilibrium proofs.
BLS12-381 support enables compatibility with Ethereum's existing KZG infrastructure.
A third option, `bls48581-fast`, is also available as a performance variant.

All commitments are absorbed into the Fiat-Shamir transcript in order.
Each `challenge()` call clones the hasher state rather than consuming it, so transcript state is preserved across multiple challenge derivations at the same position.

### Phase 4: auxiliary column construction

Beyond the main execution trace, three categories of auxiliary columns are constructed and committed.

**LogUp lookup arguments (range checks)**

Column values are decomposed into 8-bit limbs.
A multiplicity column `m[i]` counts how many times each table entry appears.
A running sum column `h` accumulates rational terms over the lookup.
A boundary constraint `L_0 · h = 0` is enforced as a polynomial constraint.
For bitwise operations (AND, OR, XOR), a 4-bit nibble decomposition is used with a 256-entry AND table.

**Memory permutation**

Memory accesses are sorted by `(address, timestamp)`.
A grand product accumulator `Z` checks that the multiset of `(address, value, timestamp, read/write)` tuples matches between the original and sorted order:

```
Z[i+1] = Z[i] × numerator[i] / denominator[i]
```

Randomness `γ` and `δ` are derived from the transcript.
RISC-V and SBF use single 64-bit values per memory cell; EVM uses 4-limb 256-bit values.

**Register file permutation**

Per-port sorted accesses verify register read consistency.
Port-indexed timestamps `P × row_ts + port_offset` separate port lanes.
This results in `6k + 2` auxiliary columns for `k` register ports.

Challenge derivation order: `alpha` is derived after trace commitments; `gamma` and `delta` for permutations are derived after permutation commitments.

### Phase 5: constraint polynomial

The combined constraint polynomial `C(x)` incorporates:

- Selector-gated intra-row VM constraints, combined with powers of `alpha`
- Cross-row constraints (next-PC continuity, LogUp running sum transitions), gated by `(x - ω^(n-1))` to exclude wrap-around
- LogUp boundary and decomposition constraints
- Permutation grand-product transition constraints

`C(x)` has degree up to `2n`.
The quotient polynomial `Q(x) = C(x) / Z_H(x)`, where `Z_H(x) = x^n - 1`, is split into at most 2 chunks of degree `n` and committed separately.

### Phase 6: evaluation and batch opening

Challenge `z` is derived from the transcript after the quotient commitments are absorbed.
All committed polynomials are evaluated at `z`; shifted columns (needed for cross-row constraints) are evaluated at `ω·z`.
Challenge `beta` is then derived for the batch KZG opening.

Batch opening combines all polynomials with powers of `beta`, divides by `(x - z)` via synthetic division, and produces a single KZG proof.
The final pairing check verifies:

```
e(C_combined - y·G1, G2) == e(π, [τ]₂ - z·G2)
```

The result is an `ExecutionProof` struct containing trace commitments, quotient commitments, all evaluations, batch proofs, and LogUp and permutation components.
A `ChunkProof` wraps this with the initial and final state hashes and the chunk index.

## Recursive composition

### Chunking and state chaining

`StreamingProver` executes the VM in fixed chunks.
Each `ExecutionChunk` carries the trace, the initial state hash, the final state hash, and the chunk index.
State hashes cryptographically chain chunks: `chunk[i].final_hash` must equal `chunk[i+1].initial_hash`.
This chain property is verified at every fold step.

### Sequential accumulation

`AccumulatedClaim` in `crates/zkp/src/recursive.rs` holds a left-hand point `l_acc` and right-hand point `r_acc` as G1 curve points.

`begin_chunk()` initializes the accumulator from the first chunk's KZG components.
`fold_chunks()` then processes each subsequent chunk:

1. Verify state chain continuity: confirm the final state hash of the previous chunk matches the initial state hash of the current chunk.
2. Derive Fiat-Shamir challenge `r` from the current transcript state.
3. Update: `L_acc = L_prev + r × L_new`, `R_acc = R_prev + r × R_new`.

After all chunks are folded in, `verify_final()` performs a single pairing check:

```
e(L_acc, G2) == e(R_acc, [τ]₂)
```

This is KZG accumulation in the style of an Inner Pairing Product, not a SNARK-in-SNARK construction.
It requires a trusted setup for accumulation but is significantly faster than recursive verifier circuits.

### Binary tree folding

`crates/zkp/src/tree_fold.rs` reduces accumulation depth from O(N) to O(log N).

Incoming chunk proofs are processed like binary addition with carry:
if level `i` in the folding stack is already occupied, the two proofs at that level are folded together and the result is carried to level `i+1`;
if level `i` is empty, the proof is stored there.
After all chunks are processed, remaining stack entries are folded from high to low level.

The final `RecursiveProof` records the total chunk depth, the initial and final hashes of the complete execution, and one `AccumulatedClaim` requiring exactly one pairing check to verify the entire execution.

## Current status and limitations

MetaVM ships with a test suite spanning all five crates.
The prover and verifier are functional for all three VM backends today.

**Known limitations:**
- Mainnet integration is not yet complete. MetaVM proofs are not yet used for network consensus; that integration is in progress as Quilibrium's execution layer matures.
- The MPC attestation path (`mpc_proof.rs`, Shamir secret sharing) is implemented but not yet exposed through the CLI binaries.
- Proof generation time scales with execution length and chunk count. For very long executions (millions of steps), wall-clock proving time on a single machine may be significant; use `--workers N` to parallelize across CPU cores.
- The BLS12-381 commitment scheme uses the Ethereum KZG ceremony trusted setup, which has a fixed size of 4,096 G1 points, capping the maximum polynomial degree per chunk accordingly.

As Quilibrium's execution layer matures, MetaVM proofs will be used to attest to computation results across the network.
Smart contracts and workloads running on any of the supported VMs can then be verified by Quilibrium nodes without trusted intermediaries, replacing replication-based consensus with compact cryptographic attestation.

---
*Last updated: 2026-04-20*
