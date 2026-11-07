---
sidebar_position: 4
---

# Deploy Commands

The deploy commands enable deployment of various resources to the Quilibrium network, including applications, tokens, files, and hypergraph schemas.

## Overview

The deploy command suite provides a unified interface for deploying different types of resources:
- **Applications**: QCL (Quilibrium Compute Language) programs
- **Tokens**: Custom token contracts with configurable behaviors
- **Files**: Hypergraph namespaces with pre-defined RDF schema for handling data files with encryption support
- **Hypergraph**: Hypergraph namespaces, for encrypted data and RDF schemas for enforcing structured data

## Base Deploy Command

When used without a subcommand, defaults to compute deployment.

```bash
qclient deploy
```

This is equivalent to:
```bash
qclient deploy compute
```

## Deploy Compute

Deploy QCL applications to the network, or update existing applications when domain is specified.

```bash
qclient deploy compute [--domain|-d <DomainAddress>] [<ConfigurationKey>=<ConfigurationValue> ...] <QCLFileName> [<RDFFileName>]
```

**Parameters:**
- `[--domain|-d <DomainAddress>]`: Optional domain for deployment or updating (auto-inferred for new deployments if not specified)
- `[<ConfigurationKey>=<ConfigurationValue>]`: Configuration settings (see below)
- `<QCLFileName>`: Path to the QCL file to deploy
- `[<RDFFileName>]`: Optional RDF schema file (auto-inferred from QCL filename if not specified)

### Compute Configuration Options

- `ReadPublicKey`: Ed448 public key for read access of encrypted data (57 bytes hex)
- `WritePublicKey`: Ed448 public key for write access of encrypted data (57 bytes hex)  
- `OwnerPublicKey`: BLS48-581 public key for administration of configuration, empty to revoke administration rights completely (585 bytes hex)

**Examples:**

Basic deployment:
```bash
qclient deploy compute application.qcl
```

With specified keys:
```bash
qclient deploy compute \
  ReadPublicKey=0x[57-byte hex string] \
  WritePublicKey=0x[57-byte hex string] \
  OwnerPublicKey=0x[585-byte hex string] \
  application.qcl
```

With explicit domain:
```bash
qclient deploy compute -d 0x[32-byte hex string] application.qcl
```

With explicit RDF schema:
```bash
qclient deploy compute application.qcl schema.rdf
```

:::note
If no RDF file is specified, the system attempts to find a corresponding file by replacing the .qcl extension with .rdf.
For example, `application.qcl` would look for `application.rdf`.
:::

### Updating Existing Compute Applications

When a domain is specified for an existing deployment, you can update the application:

```bash
qclient deploy compute -d 0x[32-byte hex string] \
  ReadPublicKey=0x[57-byte hex string] \
  WritePublicKey=0x[57-byte hex string] \
  updated-app.qcl updated-schema.rdf
```

:::warning
**Update Restrictions for Compute:**
- Cannot remove any fields from the RDF schema
- Cannot remove any types from the RDF schema
- Can only add new fields or types
- Requires signature from the OwnerPublicKey specified in configuration
- Update transaction must be signed with the BLS48-581 owner key
:::

## Deploy File

Deploy files to the hypergraph. A file is sealed to your read key unless `--public` is given.

```bash
qclient deploy file --domain|-d <DomainAddress> [--public] <FileName>
```

**Parameters:**
- `--domain|-d <DomainAddress>`: Domain for the file
- `[--public]`: Seal to the public file key, so anyone can read the file (same fee); without it, only your read key opens it
- `<FileName>`: Path to the file to deploy

**Examples:**

Deploy a public file:
```bash
qclient deploy file -d 0x[32-byte hex string] --public image.png
```

Deploy a private file (your read key):
```bash
qclient deploy file -d 0x[32-byte hex string] private-data.json
```

Retrieve a file with `qclient deploy get <FullAddress> <OutputPath>`. It tries your read key, then the public file key, and says which one opened the file.

:::tip
This command uses the standard file RDF schema for metadata storage.
:::

## Deploy Token

Deploy custom token contracts with configurable properties, or update existing tokens when domain is specified.

```bash
qclient deploy token [--domain|-d <DomainAddress>] [<ConfigurationKey>=<ConfigurationValue> ...]
```

**Parameters:**
- `[--domain|-d <DomainAddress>]`: Optional domain for updating existing token (requires owner key)

**Configuration Parameters:**

### Core Properties
- `Name`: Token name (e.g., "Example Token")
- `Symbol`: Token symbol (e.g., "EXMPL")  
- `Supply`: Initial token supply (big endian integer, hex string)
- `Units`: Decimal units for divisible tokens (big endian integer, hex string)
- `OwnerPublicKey`: BLS48-581 public key for ownership, empty to revoke or deploy as immutable (585 bytes hex)

### Behavior Flags
- `Behavior`: Comma-separated list or bitwise flags:
  - `Mintable` (1): New tokens can be minted up to total supply
  - `Burnable` (2): Tokens can be burned, decreasing total supply
  - `Divisible` (4): Token has decimal units
  - `Acceptable` (8): Requires acceptance for transfers
  - `Expirable` (16): Transfers can have expiration limits
  - `Tenderable` (32): Can be used as payment method

### Mint Strategy (for Mintable tokens)
- `MintStrategy.MintBehavior`: How tokens can be minted
  - `NoMintBehavior`: Cannot be minted
  - `MintWithProof`: Requires proof
  - `MintWithAuthority`: Requires authority signature
  - `MintWithSignature`: Requires specific signature
  - `MintWithPayment`: Requires payment

- `MintStrategy.ProofBasis`: Type of proof required (if MintWithProof)
  - `NoProofBasis`: No proof accepted
  - `ProofOfMeaningfulWork`: Requires proof of meaningful work
  - `VerkleMultiproofWithSignature`: Requires verkle multiproof with signature

- `MintStrategy.VerkleRoot`: Verkle root (if ProofBasis is VerkleMultiproofWithSignature)

- `MintStrategy.Authority`: Authority configuration (if MintWithAuthority/Signature)
  - `MintStrategy.Authority.KeyType`: Key type identifier
  - `MintStrategy.Authority.PublicKey`: Authority's public key
  - `MintStrategy.Authority.CanBurn`: Whether authority can burn tokens

- `MintStrategy.PaymentAddress`: Address for payments (if MintWithPayment)
- `MintStrategy.FeeBasis.Type`: Fee structure (if MintWithPayment)
  - `NoFeeBasis`: Cannot be purchased
  - `PerUnit`: Per-unit fee
- `MintStrategy.FeeBasis.Baseline`: Base fee amount (big integer)

### Additional References
- `AdditionalReference`: Comma-separated 64-byte addresses for linked resources

**Examples:**

Basic fungible token:
```bash
qclient deploy token \
  Name="Example Token" \
  Symbol="EXMPL" \
  Behavior=Divisible,Acceptable,Expirable \
  Units=1000000 \
  Supply=1000000000000 \
  OwnerPublicKey=0x[585-byte hex string]
```

NFT collection with minting:
```bash
qclient deploy token \
  Name="Art Collection" \
  Symbol="ART" \
  Behavior=Mintable \
  MintStrategy.MintBehavior=MintWithPayment \
  MintStrategy.PaymentAddress=0x[112-byte hex string] \
  MintStrategy.FeeBasis.Type=PerUnit \
  MintStrategy.FeeBasis.Baseline=8000000000 \
  Supply=1000 \
  OwnerPublicKey=0x[585-byte hex string]
```

Token with authority-based minting:
```bash
qclient deploy token \
  Name="Authority Token" \
  Symbol="AUTH" \
  Behavior=Mintable,Burnable \
  MintStrategy.MintBehavior=MintWithAuthority \
  MintStrategy.Authority.KeyType=1 \
  MintStrategy.Authority.PublicKey=0x[public-key-hex] \
  MintStrategy.Authority.CanBurn=true \
  Supply=1000000 \
  OwnerPublicKey=0x[585-byte hex string]
```

Token with linked files:
```bash
# First deploy metadata files
qclient deploy file metadata1.json 0x[57-byte hex string encryption public key]
qclient deploy file metadata2.json 0x[57-byte hex string encryption public key]

# Then deploy token with references
qclient deploy token \
  Name="Enhanced Token" \
  Symbol="ENHT" \
  AdditionalReference=0x[64-byte hex string],0x[64-byte hex string] \
  Supply=100000
```

### Updating Existing Tokens

When a domain is specified, you can update certain parameters of an existing token:

```bash
qclient deploy token -d 0x[32-byte hex string] \
  Name="Updated Token Name" \
  Supply=2000000 \
  AdditionalReference=0x[64-byte hex string],0x[64-byte hex string]
```

:::warning
**Update Restrictions for Tokens:**
- Cannot change `Behavior` flags
- Cannot change `Units` 
- Can update: Name, Symbol, Supply (if mintable), AdditionalReference, MintStrategy parameters
- Requires signature from the OwnerPublicKey specified in original deployment
- Update transaction must be signed with the BLS48-581 owner key
:::

## Deploy Hypergraph

Deploy hypergraph namespaces and configurations, or update existing hypergraph schemas when domain is specified.

```bash
qclient deploy hypergraph [--domain|-d <DomainAddress>] [<ConfigurationKey>=<ConfigurationValue> ...] [<RDFFileName>]
```

**Parameters:**
- `[--domain|-d <DomainAddress>]`: Optional domain for updating existing hypergraph (requires owner signature)
- `[<ConfigurationKey>=<ConfigurationValue>]`: Configuration settings (see below)
- `[<RDFFileName>]`: RDF schema file defining the structured data for vertices

### Hypergraph Configuration Options

- `ReadPublicKey`: Ed448 public key for read access (57 bytes hex)
- `WritePublicKey`: Ed448 public key for write access (57 bytes hex)
- `OwnerPublicKey`: BLS48-581 public key for ownership, empty if revoked or deployed as immutable (585 bytes hex)

**Examples:**

Initial deployment:
```bash
qclient deploy hypergraph \
  ReadPublicKey=0x[57-byte hex string] \
  WritePublicKey=0x[57-byte hex string] \
  OwnerPublicKey=0x[585-byte hex string] \
  schema.rdf
```

### Updating Existing Hypergraph

When a domain is specified, you can update the hypergraph configuration:

```bash
qclient deploy hypergraph -d 0x[32-byte hex string] \
  ReadPublicKey=0x[57-byte hex string] \
  WritePublicKey=0x[57-byte hex string] \
  updated-schema.rdf
```

:::warning
**Update Restrictions for Hypergraph:**
- Cannot remove any fields from the RDF schema
- Cannot remove any types from the RDF schema
- Can only add new fields or types
- Can update access keys (ReadPublicKey, WritePublicKey)
- Requires signature from the OwnerPublicKey specified in original deployment
- Update transaction must be signed with the BLS48-581 owner key
:::

## Cost Estimation

All deploy commands support the `--dry-run` flag for cost estimation:

```bash
qclient deploy compute application.qcl --dry-run
```

This will:
- Calculate deployment costs based on current fee market
- Show estimated QUIL required
- Not execute the actual deployment

## Deployment Process

1. **Validation**: Verifies file existence and syntax
2. **Compilation**: Compiles QCL code (for compute deployments)
3. **Schema Processing**: Processes and validates RDF schemas
4. **Fee Calculation**: Determines deployment cost
5. **Transaction Creation**: Creates deployment transaction
6. **Network Submission**: Submits to the network
7. **Confirmation**: Waits for network confirmation

## Error Handling

Common deployment errors:

- **Insufficient Funds**: Not enough QUIL for deployment fees
- **Compilation Error**: QCL code has syntax or semantic errors
- **Schema Validation Error**: RDF schema is invalid
- **File Not Found**: Specified file doesn't exist
- **Network Error**: Unable to connect to the network
- **Domain Error**: Specified domain doesn't exist or is inaccessible

## Best Practices

### Before Deployment

1. **Test Locally**: Validate code and schemas before deployment
2. **Estimate Costs**: Use `--dry-run` to check fees and validity
3. **Backup Keys**: Ensure you have backups of deployment keys
4. **Verify Domains**: Confirm domain addresses if using specific domains

### During Deployment

1. **Monitor Progress**: Watch for confirmation messages
2. **Save Addresses**: Record deployed resource addresses
3. **Verify Deployment**: Check deployment succeeded using query commands

### After Deployment

1. **Test Functionality**: Verify deployed resources work as expected
2. **Document Addresses**: Keep records of all deployed addresses
3. **Monitor Usage**: Track resource utilization and costs

## Related Commands

- [Hypergraph Commands](/docs/run-node/qclient/commands/hypergraph) - Interact with deployed hypergraph data
- [Compute Commands](/docs/run-node/qclient/commands/compute) - Execute deployed applications
- [Token Commands](/docs/run-node/qclient/commands/token) - Manage deployed tokens
- [Key Commands](/docs/run-node/qclient/commands/key) - Manage deployment keys