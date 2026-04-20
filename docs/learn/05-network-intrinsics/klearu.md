---
id: klearu
title: Klearu
sidebar_label: Klearu
sidebar_position: 1
---

# Klearu

Klearu is Quilibrium's native runtime for privacy-preserving machine learning inference.
It is built into the network as a protocol intrinsic, meaning private AI computation is a first-class capability of the network, not an add-on layer.

The core idea: when you run inference through Klearu, the server that computes your result never sees your input.
This is not marketing -- it is a cryptographic guarantee enforced by a two-party computation protocol.

Klearu is licensed under AGPL-3.0 with additional terms and is available at [github.com/QuilibriumNetwork/klearu](https://github.com/QuilibriumNetwork/klearu).

## Why private inference matters

Today, virtually all AI inference happens on servers controlled by service providers.
When you send a prompt, you send plaintext to a machine you do not control.

The two most common privacy approaches each carry significant limitations:

**Trusted Execution Environments (TEEs)** place computation inside a hardware enclave.
The operator cannot, in theory, inspect what happens inside the enclave.
In practice this is trust delegation: you rely on the hardware manufacturer, and on the assumption that the operator has not found a way to inspect the enclave.
No cryptographic proof of privacy is produced.

**Fully Homomorphic Encryption (FHE)** allows computation on data that is never decrypted, which is cryptographically sound.
The performance cost is enormous: at current compute levels, FHE is not practical for LLM inference at any meaningful scale.

Klearu uses a third approach: **two-party computation (2PC)**.
2PC is a cryptographic technique where two parties jointly compute a function without either learning the other's private input.
For inference: the user holds the query tokens, and the server holds the model weights.
The two sides run a joint protocol that produces the output, but at no point does the server see the plaintext query, and at no point does the user see the raw model weights.

One important clarification: in Klearu's MPC model, the server's model weights are always public to the server itself.
The protocol protects the client's token IDs, not the model parameters.

## Try it now

A browser-based demo of Klearu private chat is available at:

**[klearu-demo.qstorage.quilibrium.com](https://klearu-demo.qstorage.quilibrium.com/)**

Party 0 runs entirely in your browser via WASM.
Every message is split into cryptographic secret shares using 2PC: each server only ever sees random noise, and the actual content can only be reconstructed by combining both shares -- which only your browser holds.
No plaintext ever leaves your device.

The demo includes two features worth exploring:

**Inspector tab**: shows the exact bytes sent to each server.
Every DPF key and logit share is opaque because it is computationally indistinguishable from random data.
You can verify that neither server receives anything meaningful on its own.

**Thinking toggle**: reveals the model's chain-of-thought reasoning before its final answer.

Output is slower than a typical LLM chat interface because the high-security mode generates and exchanges many Beaver triples per token across both servers.
That cost is the price of the cryptographic guarantee.

:::tip Verify it yourself
Other services market themselves as "private" AI.
Open your browser's network inspector while using them and look at the traffic: you will see your plaintext prompts sent directly to their servers.
With Klearu, every payload is a cryptographic share that reveals nothing on its own.
Check for yourself.
:::

## Security levels at a glance

Klearu offers three security modes with different trade-offs between privacy and communication cost:

| Level | Approx. communication per token | What the server learns |
|---|---|---|
| **Lower** | ~4.6 KB | Nothing about token IDs; intermediate computations run in plaintext after embedding reveal |
| **High (secure)** | ~2 MB | Only intermediate RMS scalars and revealed Q/K attention vectors |
| **High (no-reveal)** | Higher than secure | Only intermediate RMS scalars and attention weights (not Q/K raw values) |

In lower-security mode, throughput is comparable to running a model locally with llama.cpp on CPU-only hardware.
High-security mode has substantially higher communication overhead driven by Beaver triple generation and the number of MPC rounds per layer.

## What Klearu is

Klearu is two interleaved systems sharing a single Rust workspace of 13 crates:

**A SLIDE/LSH training and inference engine** -- a CPU-native sparse neural network runtime based on the SLIDE paper family, with SIMD acceleration, learnable hashing, LSH autotuning, and Deja Vu-style sparse transformer inference.

**A 2PC/MPC private inference engine** -- a two-party secure computation system for LLM and vision model inference, where neither party learns the other's private inputs.

These two systems are deliberately layered: the SLIDE engine handles efficient CPU-native inference, and the MPC engine wraps it with cryptographic privacy guarantees.
The combination allows large language models to be evaluated on commodity CPU hardware with cryptographic protection of user inputs.

## Getting started

Klearu is available today for local use, development, and integration testing.
Mainnet integration is not yet shipped; see [Integration with Quilibrium](#integration-with-quilibrium) below.

```bash
git clone https://github.com/QuilibriumNetwork/klearu

# LLM-only build -- no external dependencies
cargo build --release -p klearu-llm

# Full workspace build -- requires the Quilibrium monorepo as a sibling directory
cargo build --release
```

**System requirements**: Klearu runs on CPU hardware without requiring GPUs.
SIMD acceleration is provided via AVX2 on x86_64, NEON on ARM, and a scalar fallback for all other targets.
BF16 quantization and cache-line-aligned weight layouts reduce memory bandwidth pressure.
For two-server topology, both servers must be reachable from the client and from each other.

**Model loading**: models are loaded in HuggingFace safetensors format.
The LLM supports the LLaMA family and Qwen3.5 hybrid architecture; vision models load from HuggingFace [timm](https://huggingface.co/timm) safetensors.

## How the 2PC protocol works

Klearu supports two deployment topologies depending on the client environment.

### Topology A: Native TCP (klearu-private)

For server-to-server or local development use.
Both parties load the same model locally.
The client (Party 0) holds the user's tokens.
The server (Party 1) runs inference.
Transport is TCP with `TCP_NODELAY` set -- this is critical: without it, Nagle buffering adds significant latency per Beaver triple exchange, and a high-security forward pass requires many such exchanges per token.

**Ferret triple generation**: Klearu implements Gilboa-style multiplication triples via Random Oblivious Transfer (ROT).
The server calls `send_rot()` to generate random `(m0, m1)` pairs.
The client calls `recv_rot()` to receive values indexed by its choice bits.
A correction channel converts the raw ROT output into Beaver triple shares used for secure multiplication.

**Per-token forward pass (High Security, Q32.32 fixed-point):**

1. **Embedding lookup via secret sharing**: the client calls `shared_embedding_lookup_64(0, model, token_id)` and receives the embedding as its additive share; the server holds a zero vector.
   The sum of both shares equals the plaintext embedding.
   No token ID is ever transmitted.

2. **Per-layer MPC** (`private_block_forward_secure`):
   - **RMSNorm** (`rmsnorm_shared_64`): Beaver triple squaring reveals only the scalar RMS value; individual activation values remain secret.
   - **Attention**: QKV projections are computed locally (public weights multiplied by a shared input requires no communication). For "no-reveal" attention, Q·K dot products use `beaver_dot_product_64`, requiring `num_tokens² × head_dim` Beaver triples. For the "secure" variant, Q and K vectors are revealed, and scores are computed in plaintext.
   - **MLP (SwiGLU)**: a polynomial approximation of SiLU uses Beaver triples for secure evaluation. Two variants are available: degree-2 (max error ~0.12, faster) and degree-4 (max error ~0.064, more accurate). Each gated activation requires 3 triples and 3 round-trips.
   - **Residual adds**: local, no communication required.

3. **Final RMSNorm and LM head**: public weights, local computation.

4. **Logit reveal**: both parties exchange their logit shares and sum them to reconstruct plaintext logits.

5. **Continuation signal**: the client sends `u32=1` to continue or `u32=0` to stop.

**Lower-security mode** (~4.6 KB/token): only the embedding share is revealed.
Both parties reconstruct a plaintext hidden state and run identical deterministic forward passes from that point.
This protects token IDs but not intermediate computations.

**Note on GatedDeltaNet layers**: even in high-security mode, GatedDeltaNet linear attention layers run in plaintext -- the normalized hidden state is revealed for these layers.
This is a deliberate trade-off that preserves the O(n) efficiency advantage of linear attention.

**Note on softmax**: even in "no-reveal" attention mode, the attention pattern (what the model attends to) is exposed, not Q/K raw values.
Attention weights are always revealed.

### Topology B: Two-Server WebSocket (klearu-server)

Designed for browser clients.
The browser runs a WASM module (Party 0); two servers together hold the model.

**DPF-PIR for token privacy** (`klearu-dpf`):
The browser generates a pair of Distributed Point Function (DPF) keys using `dpf_gen(alpha=token_id, beta=1, depth=16)`.
Each key is approximately 276 bytes (1B party + 16B seed + 4B output correction + 16 × 17B correction words; the exact serialized size may vary slightly by implementation).
The client sends `key_1` to Server A (which forwards it to Server B) and retains `key_0`.
Each server evaluates its key over the full vocabulary (up to 65,536 entries) and computes an inner product with the quantized embedding table, producing an embedding share -- without either server ever seeing the token ID.
The BGI construction guarantees that `share0[token_id] + share1[token_id] = embedding[token_id]`, while all other indices cancel to zero.

**WASM transport**: communication between the browser WASM module and the server uses SharedArrayBuffer with an 8-byte header (4B control word + 4B length).
The worker thread blocks via `Atomics.wait()`.
Both servers set `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: credentialless` HTTP headers, which are required by browsers to enable SharedArrayBuffer.

**Protocol message tags**: `TAG_MPC_DATA (0x50)`, `TAG_LOGIT_SHARE (0x51)`, `TAG_NEXT_TOKEN (0x52)`.

**OPRF-based sparse MLP** (optional): the client hashes the hidden state to a Ristretto255 point and blinds it with a random scalar before sending it to the server.
The server applies its PRF key to the blinded point.
The client unblinds the result to obtain the PRF output.
Both parties seed a Fisher-Yates shuffle from this PRF output to select the same active neurons -- the server never learns which neurons correspond to which input.
Note: the hash-to-point function uses a custom AES-128-based construction rather than the IETF hash-to-curve standard; its security analysis is not yet documented in the codebase.

**Prefill optimization**: for multi-turn or long prompts, all N prompt token DPF keys are batched in a single TCP round-trip to Server B, and the LM head is skipped for N-1 of those positions.
This is a meaningful throughput improvement for longer inputs.

**Topology comparison**:

| | Topology A (TCP) | Topology B (WebSocket) |
|---|---|---|
| Client | Native binary | Browser (WASM) |
| Token privacy mechanism | Secret-shared embedding lookup | DPF-PIR |
| Server count | 2 | 2 (Server A + Server B) |
| Best for | Server-side applications, development | End-user browser products |

## SLIDE and sparse inference

### The problem with dense layers

Dense neural network layers compute every neuron on every forward pass, even when most activations are near-zero and contribute little to the output.
SLIDE solves this by using Locality-Sensitive Hashing (LSH) to identify the top-K active neurons without evaluating all of them.
This gives O(top_k) cost per forward pass instead of O(n_neurons), and it is what makes Klearu practical on CPU hardware for large models.

### Hash families

Klearu implements five LSH families:

| Family | How it works | Best for |
|---|---|---|
| **SimHash** | Sign of random projection dot products | General dense vector similarity |
| **SRP** | Like SimHash but with sparse {-1, 0, +1} projections | Sparse inputs (faster dot products) |
| **WTA** | For each hash function, returns argmax position within a random window | Position-based similarity |
| **DWTA** | WTA extended with a deterministic fallback when the window has no non-zero elements | Sparse inputs (prevents collision on empty windows) |
| **MinHash** | Approximates Jaccard similarity | Set-valued inputs |

### LSH index

The index maintains L hash tables, each with 2^K buckets.
Neurons are inserted at construction time.
At query time: compute L hashes, retrieve candidate neurons from matching buckets, union results or rank by match count, compute weighted sums only for the active subset.
If no candidates are found, the system falls back to all neurons.

**Bucket eviction**: FIFO, or reservoir sampling using Algorithm R (Vitter 1985), which maintains uniform probability of retention regardless of stream length.

**Rebuild scheduling**: rebuild intervals grow exponentially -- `rebuild_i_at = Σ_{j=0}^{i} floor(base × e^(λ×j))`.
Early rebuilds are frequent (weights change fast at the start of training); later ones are spaced out as training converges.

### MONGOOSE: Learnable hashing

Rather than using fixed random projections for LSH, `klearu-mongoose` trains the projection matrices to adapt to the actual data distribution.
Training uses triplet loss with a straight-through gradient estimator.
`TripletMiner` groups vectors by bucket to find informative triplets.
Projection rows are L2-normalized after each update.

Note: MONGOOSE is a standalone crate; it is not automatically wired into the SLIDE training loop.
Callers must integrate it explicitly.

### LSH autotuning (klearu-bolt)

Given a target recall percentage, `klearu-bolt` performs a grid search over K ∈ [4, 16] and L ∈ [10, 200], comparing each configuration against brute-force ground truth and selecting the (K, L) pair with the highest recall-to-cost ratio that meets the threshold.

## Deja Vu sparse transformer inference

Klearu implements the [Deja Vu](https://arxiv.org/abs/2310.17157) technique for predicting which attention heads and MLP neurons matter for each token, without evaluating all of them.

Two predictor variants:

**MLP predictor**: a two-layer network trained via distillation from dense forward passes.
Importance is measured as the L2 norm of each attention head's output and the mean absolute value of each MLP neuron's contribution.
Training uses binary cross-entropy loss.

**LSH predictor**: no neural network at all.
(hidden_state → important_neuron_ids) pairs are inserted directly into an LSH index.
At inference time, the hidden state is queried and the top-K matches are returned.
This is more memory-efficient than the MLP predictor.

Calibration runs dense forward passes over a calibration corpus, accumulates per-layer statistics, and trains the predictors.
Predictors are saved as `layer_{i}_head.json` and `layer_{i}_neuron.json` files that can be reloaded without re-calibration.
Predictor calibration is a one-time step per model.

## LLM architecture

Klearu supports the LLaMA family and the Qwen3.5 hybrid architecture.

Standard components: Grouped Query Attention (GQA), Rotary Position Embeddings (RoPE), RMSNorm, SwiGLU activations, KV cache.

**GatedDeltaNet linear attention**: for Qwen3.5 hybrid models, Klearu implements GatedDeltaNet linear attention as an alternative to standard attention.
The state matrix S (dimensions: key_dim × value_dim) is updated as `S = alpha*S + beta*(key^T ⊗ (value - S*key))`, with exponential decay and sigmoid gating.
This achieves O(n) complexity versus O(n²) for standard attention.
GatedDeltaNet alternates with standard attention every 4 layers (configurable).

**Chat templates**: ChatML, LLaMA2, LLaMA3, Mistral, Zephyr, and raw.

**Model loading**: HuggingFace safetensors format.

## Vision architecture

`klearu-vision` supports nine vision transformer architectures:

| Architecture | Notes |
|---|---|
| ViT | Standard Vision Transformer |
| Swin | Shifted Window Transformer |
| DaViT | Dual Attention Vision Transformer |
| ConvNeXt | Convolution-based transformer-style |
| Hiera | Hierarchical vision encoder |
| EVA-02 | Large-scale contrastive pretraining |
| SigLIP | Sigmoid loss image-language pretraining |
| DINOv2 | Self-supervised vision encoder |
| Qwen Vision | Vision encoder for Qwen VLM |

All architectures load from HuggingFace [timm](https://huggingface.co/timm) safetensors format with automatic preprocessing detection.
A VLM bridge in `klearu-llm` connects vision encoders to the LLM for multimodal models like Qwen3.5-0.8B VLM.

Private inference is supported for all nine vision architectures, not only for LLMs.

## Crate architecture

| Crate | Role |
|---|---|
| `klearu` | Facade: workspace re-exports under feature flags |
| `klearu-server` | Axum WebSocket server for two-server topology; HTTP API at `/api/health`, `/api/model`, `/api/generate`, `/api/embed_text` |
| `klearu-wasm` | Browser-side Party 0 WASM bindings using SharedArrayBuffer |
| `klearu-private` | End-to-end private inference: Ferret COT + Ristretto255 OPRF; three security modes |
| `klearu-mpc` | 2PC building blocks: Beaver triples, fixed-point arithmetic (Q16.16 / Q32.32), secret sharing, `Transport` trait |
| `klearu-dpf` | BGI Distributed Point Functions via AES PRG tree; also includes DCF (not used in current pipeline) |
| `klearu-llm` | LLaMA-family LLM inference with GatedDeltaNet linear attention |
| `klearu-vision` | Nine vision transformer architectures with VLM bridge |
| `klearu-dejavu` | Deja Vu sparse transformer predictor (MLP predictor and LSH predictor variants) |
| `klearu-bolt` | SLIDE extensions: LSH autotuning, autograd bookkeeping |
| `klearu-mongoose` | MONGOOSE learnable hashing via triplet loss |
| `klearu-accel` | SIMD (AVX2 / NEON / scalar fallback) and BF16 quantization |
| `klearu-core` | SLIDE primitives: LSH, sparse tensors, network training |

**WASM note**: `klearu-wasm` loads models via `Model::new_no_embedding()`, which omits the embedding table entirely.
The browser never holds the embedding matrix; embedding shares are obtained through DPF-PIR instead.

**Development note**: `DummyTripleGen` in `klearu-mpc` shares a known seed between parties to generate Beaver triples without real OT.
It is explicitly cryptographically broken by design and exists only for local development and testing.

## Integration with Quilibrium

Klearu is not yet integrated into the Quilibrium mainnet.
When mainnet integration ships, private inference will be available as a network-native service for any application built on Quilibrium.
Compute costs will be denominated in the same units used for all other Quilibrium computation, with no special billing layer.

The library is available today for local use, development, and integration testing.
Developers can build and integrate against it now; the API surface is stable enough for experimentation and production pilots that do not require mainnet settlement.

## Known limitations

- Mainnet integration is not yet available; private inference runs off-chain today.
- GatedDeltaNet layers always run in plaintext even in high-security mode (normalized hidden state is revealed); workloads with strict intermediate-value privacy should account for this.
- The OPRF hash-to-point function uses a custom AES-128-based construction rather than the IETF standard; its security analysis is not yet documented in the codebase.
- MONGOOSE learnable hashing is not automatically wired into the SLIDE training loop; integration requires explicit caller-side setup.
- Performance in high-security mode is bandwidth-bound; results depend heavily on network latency between the two parties.

## Licensing

Klearu is licensed under AGPL-3.0 with additional terms.
Commercial use is restricted to the Quilibrium mainnet.
Automated reimplementation for competing commercial products is explicitly prohibited.
Non-commercial and development use is permitted under the standard AGPL-3.0 terms.

---
*Last updated: 2026-04-20*
