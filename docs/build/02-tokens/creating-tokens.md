---
sidebar_position: 1
---

# Creating Tokens

Creating tokens on Quilibrium is incredibly easy, using the pre-defined token intrinsic, which allows for significantly more compact proofs of execution and handles every common use case of tokens.

## Token Configuration

Token intrinsics accept a small number of configuration values, which combine to provide a lot of complex behaviors for tokens.

###	Behavior

Defines the behavior of the given token intrinsic in terms of operations that can be performed on instances of it. See the Token Behaviors section below for more information.

### MintStrategy

If the `Mintable` Behavior is set, this MUST be defined. See the Mint Strategy section below for more information.

### Units

Divisible units of a token. If `Divisible` is NOT set, this MUST be undefined and will be interpreted as 1. `Units` MAY NOT be less than 1. Will be interpreted as the number of discrete units that makes a single whole instance of a token. Example: Most national currencies are divisible by 100, and so `Units` would be 100.

### Supply

Sets a total supply. If `Mintable` is NOT set, this MUST be defined. If not set, this will be interpreted as `2^255`. This supply is in terms of `Units`, not an undivided whole. Example: A token with a divisibility of 100 units and a maximum supply of 100,000,000.00 tokens would be encoded as 10000000000.

### Name

The printable name of the token.

### Symbol

The short-form name of the token, also known as a ticker in some contexts.

### AdditionalReference

The address corresponding to additional informational records, such as a token icon.

## Token Behaviors

Tokens can have a combination of the following behaviors. Some of these behaviors will influence the shape of the data as it is serialized on the network, all of them will influence the underlying interactions possible with the token application.

### Mintable

Has an explicit mint authority - If `Mintable` is set, `MintStrategy` MUST be defined, and `Supply` MAY be set. If not set, `Supply` MUST be set, and the total supply is minted to the creator at the time of deployment.

### Burnable
	
Allows the token to be burnt – If `Burnable` is set, `Burn` will decrease `Supply` on `Burn` events. Additional behaviors apply based on `MintStrategy`.

### Divisible

Token can be merged/split - If `Divisible` is set, `Units` MUST be defined. If not set, `Units` MUST NOT be defined. For common fungible use cases, `Divisible` should be set. If you are wanting to create collectibles, `Divisible` should not be set.

### Acceptable

Enables pending transaction flow – If `Acceptable` is set, transaction flow is `coin:Coin` -> `PendingTransaction`, `pending:PendingTransaction` -> `Transaction`, `coin:Coin` -> `MutualTransfer`. If `Acceptable` is not set, transaction flow is `coin:Coin` -> `Transaction`. Traditional style tokens have no pending flow, and thus would not have `Acceptable` set.

### Expirable

Enables expirations on pending transactions – If `Expirable` is set, `Acceptable` MUST be set, uses `Expiration` field of `pending:PendingTransaction` to permit the refund keys to accept the transaction. `Expiration` is in terms of frame numbers.

### Tenderable

Permits application shards to set their fee basis in denomination of the token. Important note: configuring an application shard to do this is _dangerous_ – the only consensus maintained by the network natively is its root commitment, the shard will have _no_ impact on QUIL emissions and may go offline if all nodes configured to cover it also go offline. If `Tenderable` is set, and `MintStrategy` is configured to use `MintWithProof`, the nodes covering the application shard will be eligible to earn rewards denominated in the token, following the configured `WorkBasis`, otherwise there are no emissions-based rewards for covering that application shard, only fees.

## Mint Strategy

The Mint Strategy configuration adds greater variety of deployment scenarios for a token.

### MintBehavior

Defines the mint behavior. For serialization purposes, an undefined `MintStrategy` will serialize `MintBehavior` as `NoMintBehavior`. For any other configurations of these values, `MintBehavior` MUST be defined as something other than `NoMintBehavior`.

#### MintWithProof

Token is mintable given some `ProofBasis` – If `MintWithProof` is set, `ProofBasis` MUST be defined. If not set, `ProofBasis` MUST NOT be defined.

#### MintWithAuthority

Token is mintable only by an authority – If `MintWithAuthority` is set, `Authority` MUST be defined.

#### MintWithSignature

Token is mintable with a signature from an authority – If `MintWithSignature` is set, `Authority` MUST be defined.

#### MintWithPayment

Token is mintable in exchange for a payment – If `MintWithPayment` is set, `PaymentAddress` MUST be defined and `FeeBasis` MUST be defined.

### ProofBasis

If MintWithProof is set, `ProofBasis` MUST be set to a value other than `NoProofBasis`.

#### ProofOfMeaningfulWork

Allows minting via the standard proof of meaningful work proof the network applies to the native reward token.

#### VerkleMultiproofWithSignature

Allows minting via a verkle multiproof with a signature to verify key ownership.

### VerkleRoot

If ProofBasis is `VerkleMultiproofWithSignature`, this is the root commitment value. Otherwise, MUST be undefined.

### Authority

If `MintWithAuthority` or `MintWithSignature` is set, `Authority` MUST also be set.

#### KeyType

Designates the key type for the authority. Must be one of the signing varieties: Ed448, BLS48-581.

#### PublicKey

The raw serialized public key

#### CanBurn

If `Burnable` is set, permits the authority key to issue burns for the token, regardless of ownership.

### PaymentAddress

If `MintWithPayment` is set, `PaymentAddress` MUST be set.

### FeeBasis

If `MintWithPayment` is set, `FeeBasis` MUST be set, but MAY be zero.

#### Type

The `Type` value of `FeeBasisType` may be set to either `NoFeeBasis`, the default serialization value, or `PerUnit`. May be expanded to other fee methodologies in the future.

#### Baseline

The baseline fee value, in raw units of QUIL.

## Deployment

Deploying a token can be performed with qclient. To illustrate, we'll provide an example of a full-featured fungible token, and a collectible.

Add `--dry-run` at the end to not deploy, but perform error checks, as well as display the cost basis (including approximate cost to deploy). Your primary account must have sufficient funds available to deploy the token.

### Fungible Token

`qclient deploy token Behavior=Divisible,Acceptable,Expirable,Tenderable MintStrategy=NoMintBehavior Units=1000000 Supply=1000000000000 Name="Example Token" Symbol=EXAMPLE`

### Collectible

To deploy a collectible, you need to first deploy the underlying images related to the distinct tokens. First, issue the deployment of the files:

`qclient deploy file -d <Domain> --public ./[0...999].png`

The resulting addresses of the deployed files will then be incorporated in the minting out process. For collectibles, we recommend `--public`. It seals each file to the public file key, a published sntrup761 keypair that every qclient carries, so anyone can read the file with `qclient deploy get <Address> <OutputPath>`. The fee is the same as for a private file. Without `--public`, a file is sealed to your own read key and only you can open it. The earlier public read key (`5b3afe03…`, decryption key `2cf07ca8…`) belongs to the retired verifiable encryption and does not work with current files.

Deploying the token with a 1 QUIL to mint fee:

`qclient deploy token Behavior=Mintable MintStrategy.Behavior=MintWithPayment MintStrategy.PaymentAddress=<Fund Recipient Address> MintStrategy.FeeBasis.Type=PerUnit MintStrategy.FeeBasis.Baseline=8000000000 AdditionalReference=<Address of file 0>,<Address of file 1>,<...> Supply=1000 Name="Example Collectible" Symbol=EXAMPLECOLLECTIBLE`

Users can then mint out the token via the token application:

`qclient token mint <TokenAddress> <quantity>`

This will require they have sufficient funds to cover the fee basis and network fees.
