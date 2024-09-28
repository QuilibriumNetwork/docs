---
sidebar_position: 3
---

# RPC

Remote Procedure Call support on Quilibrium allows hybridized offline-online mode, making management of common network assets (Accounts, Coins, Transactions) for more complex key management scenarios possible. 
This document serves to capture both the raw RPC documentation following the protobufs, and then specific management scenarios for cold custody, warm/hot custody, and MPC custody. 

:::danger

It is critical to understand that in order to maintain the privacy of your account, that use of these RPCs is kept within secure trust boundaries – do not use an RPC server you do not control, and ensure that your connection to this RPC is secure and encrypted.

:::

## Protobufs/Node RPC

### Structure

Node RPC services take the form of the primary entity being interacted with, followed by Service. 
The RPCs under the service are the names of the operations themselves, expecting a message named `Decryptable<Operation><Entity>Request` as the argument. 
The response message name follows the format of `<Operation><Entity>Response`. 
If an operation requires inputs from multiple parties and must follow stages, the response type is a stream to encapsulate the state changes as expected messages.

### Refs and AccountRefs

Generally, Ref types are simply hypergraph references by address, with the exception of AccountRefs, which have a special consideration in being either originated (e.g. created as an explicit entity on the network and referenced like any other Ref) or implicit (e.g. bound to and derived from a specific key and key type). 
The latter is important for many "cold" key management operations, where a key is generated and lives completely offline from the network, restored only to perform operations such that all resources allocated to the key material has been transferred to another key, either cold or under a different custodial strategy.

```
message OriginatedAccountRef {
  bytes address = 1;
}
 
message ImplicitAccount {
  uint32 implicit_type = 1;
  bytes address = 2;
  bytes domain = 3;
}
 
message AccountRef {
  oneof account {
    OriginatedAccountRef originated_account = 1;
    ImplicitAccount implicit_account = 2;
  }
}
```

In the `ImplicitAccount` case, the type specifier indicates the kind of implicit account it is, with 0 being a default key-derived account (Poseidon-hashed raw public key), 1 being a WebAuthN-derived account (Poseidon-hashed raw public key), which requires the corresponding domain name for validation scope. 
The type leaves room for additional key/signature support in the future.

### Request Envelopes

Because data on Quilibrium is encrypted, and general network operations can only be conducted with the requisite key material to perform decryption as part of the operations, RPC methods mirror the actual application methods, but have a wrapper message for the caller to provide relevant information to perform the actual network interaction. 
Structurally, the request envelopes contain the request itself, a keyring collection, and optionally, if the request produces side effects regarding key management, the delivery strategy for communicating these updates:

```
message Decryptable<Operation><Entity>Request {
  <Operation><Entity>Request request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
```

The key ring is simply a collection of relevant keys: most importantly, the decryption keys for referenced assets. 
In the event mutations on those given assets are performed, the reference takes a transactional lock.

```
message InlineKey {
  bytes ref = 1;
  bytes key = 2;
}
 
message KeyRing {
  repeated InlineKey keys = 1;
}
```

Delivery method indicates the delivery strategy, where the default type, 0, specifies normal inbox-driven delivery for all notifiable parties of key updates and additions. 
If type is 1, it is the omission of deliveries. 
To ensure network consistency and that it is not possible to induce an inaccessible state for relevant parties, the 
relevant keys for all notifiable parties **must** be provided in the key ring. 
Address is used to disambiguate the sender in the event multiple identifiable parties are present in the key ring.

```
message DeliveryMethod {
  uint32 delivery_type = 1;
  bytes address = 2;
}
```

### AccountService

The `quilibrium.node.node.pb.AccountService` RPC exposes a few simple operations for common account management:

```
service AccountService {
  rpc Allow(DecryptableAllowAccountRequest) returns (AllowAccountResponse);
  rpc GetBalance(DecryptableBalanceAccountRequest) returns (BalanceAccountResponse);
  rpc ListCoins(DecryptableCoinsAccountRequest) returns (CoinsAccountResponse);
  rpc ListPendingTransactions(DecryptablePendingTransactionsAccountRequest) returns (PendingTransactionsAccountResponse);
  rpc Revoke(DecryptableRevokeAccountRequest) returns (RevokeAccountResponse);
}
```

#### Allow

Allows another account to perform actions on behalf of a given account. Returns the new `AccountAllowanceRef` created and notifications delivered.

```
message AllowAccountRequest {
  AccountRef of_account = 1;
  AccountRef permitted_account = 2;
  repeated string permitted_operations = 3;
  AccountAllowanceRef allowance = 4;
  Signature signature = 5;
}
 
message DecryptableAllowAccountRequest {
  AllowAccountRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message AllowAccountResponse {
  AccountAllowanceRef allowance = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### GetBalance

Requests the total balance of all `Coins` directly under an account (not including those the account only has 
allowances over).

```
message BalanceAccountRequest {
  AccountRef account = 1;
  AccountAllowanceRef allowance = 2;
  Signature signature = 3;
}
 
message DecryptableBalanceAccountRequest {
  BalanceAccountRequest request = 1;
  KeyRing key_ring = 2;
}
 
message BalanceAccountResponse {
  bytes balance = 1;
}
```

#### ListCoins

Requests the set of all `Coins` directly under an account (including those the account only has allowances over).

```
message CoinInfo {
  CoinRef coin = 1;
  bytes balance = 2;
}
 
message CoinsAccountRequest {
  AccountRef account = 1;
  AccountAllowanceRef allowance = 2;
  Signature signature = 3;
}
 
message DecryptableCoinsAccountRequest {
  CoinsAccountRequest request = 1;
  KeyRing key_ring = 2;
}
 
message CoinsAccountResponse {
  repeated CoinInfo coins = 1;
}
```

#### ListPendingTransactions

Requests the set of all `PendingTransactions` directly under an account.

```
message PendingTransactionsAccountRequest {
  AccountRef account = 1;
  AccountAllowanceRef allowance = 2;
  Signature signature = 3;
}
 
message DecryptablePendingTransactionsAccountRequest {
  PendingTransactionsAccountRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message PendingTransactionInfo {
  PendingTransactionRef pending_transaction = 1;
  CoinInfo coin = 2;
  AccountRef refund_account = 3;
}
 
message PendingTransactionsAccountResponse {
  repeated PendingTransactionInfo pending_transactions = 1;
}
```

#### Revoke

Revokes the provided `AccountAllowance` by reference.

```
message RevokeAccountRequest {
  AccountRef of_account = 1;
  AccountAllowanceRef revoked_allowance = 2;
  AccountAllowanceRef allowance = 3;
  Signature signature = 4;
}
 
message DecryptableRevokeAccountRequest {
  RevokeAccountRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message RevokeAccountResponse {
  repeated DeliveryData deliveries = 1;
}
```

### CoinService

The `quilibrium.node.node.pb.CoinService` RPC exposes a few simple operations for common coin management:

```
service CoinService {
  rpc Allow(DecryptableAllowCoinRequest) returns (AllowCoinResponse);
  rpc Intersect(DecryptableIntersectCoinRequest) returns (IntersectCoinResponse);
  rpc Merge(DecryptableMergeCoinRequest) returns (MergeCoinResponse);
  rpc Mint(DecryptableMintCoinRequest) returns (MintCoinResponse);
  rpc MutualReceive(DecryptableMutualReceiveCoinRequest) returns (stream MutualReceiveCoinResponse);
  rpc MutualTransfer(DecryptableMutualTransferCoinRequest) returns (stream MutualTransferCoinResponse);
  rpc Revoke(DecryptableRevokeCoinRequest) returns (RevokeCoinResponse);
  rpc Split(DecryptableSplitCoinRequest) returns (SplitCoinResponse);
  rpc Transfer(DecryptableTransferCoinRequest) returns (TransferCoinResponse);
}
```

#### Allow

Allows another account to perform actions on behalf of a given `Coin`. 
Returns the new `CoinAllowanceRef` created and notifications delivered.

```
message AllowCoinRequest {
  CoinRef of_coin = 1;
  AccountRef permitted_account = 2;
  repeated string permitted_operations = 3;
  AccountAllowanceRef account_allowance = 4;
  CoinAllowanceRef coin_allowance = 5;
  Signature signature = 6;
}
 
message DecryptableAllowCoinRequest {
  AllowCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message AllowCoinResponse {
  CoinAllowanceRef allowance = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### Intersect

Performs a set intersection evaluation on a given `Coin`. 
Returns a boolean value indicating whether or not the provided addresses appeared in the intersection data.

```
message IntersectCoinRequest {
  repeated bytes addresses = 1;
  AccountAllowanceRef account_allowance = 2;
  CoinAllowanceRef coin_allowance = 3;
  CoinRef of_coin = 4;
}
 
message DecryptableIntersectCoinRequest {
  IntersectCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message IntersectCoinResponse {
  bool intersects = 1;
}
```

#### Merge

Merges a collection of `CoinRefs` into a single `Coin`. 
Note: Merging combines the intersection data of the `Coin`s.

```
message MergeCoinRequest {
  repeated CoinRef coins = 1;
  AccountAllowanceRef account_allowance = 2;
  repeated CoinAllowanceRef coin_allowances = 3;
  Signature signature = 4;
}
 
message DecryptableMergeCoinRequest {
  MergeCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message MergeCoinResponse {
  CoinRef coin = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### Mint

Mints `Coin`s based on the provided proofs from the protocol. 
Unless the node is explicitly configured to not auto claim, this is handled automatically.

```
message MintCoinRequest {
  repeated bytes proofs = 1;
  AccountAllowanceRef allowance = 2;
  Signature signature = 3;
}
 
message DecryptableMintCoinRequest {
  MintCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message MintCoinResponse {
  repeated CoinInfo coins = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### MutualReceive

The recipient side of a live mutual transfer process. 
Returns a stream of messages indicating status of the transfer process, initiated `rendezvous` string (which must be provided to the sender), the received `CoinRef` and relevant deliveries.

```
message MutualReceiveCoinRequest {
  AccountRef to_account = 1;
  AccountAllowanceRef allowance = 2;
  Signature signature = 3;
}
 
message DecryptableMutualReceiveCoinRequest {
  MutualReceiveCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message MutualReceiveCoinResponse {
  uint32 status = 1;
  bytes rendezvous = 2;
  CoinRef coin = 3;
  repeated DeliveryData deliveries = 4;
}
```

#### MutualTransfer

The sender side of a provided `CoinRef` in a live mutual transfer process. 
Returns a stream of messages indicating status of the transfer process, and relevant deliveries.

```
message MutualTransferCoinRequest {
  bytes rendezvous = 1;
  CoinRef of_coin = 2;
  AccountAllowanceRef account_allowance = 3;
  CoinAllowanceRef coin_allowance = 4;
  Signature signature = 5;
}
 
message DecryptableMutualTransferCoinRequest {
  MutualTransferCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message MutualTransferCoinResponse {
  uint32 status = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### Revoke

Revokes a provided `CoinAllowanceRef` for the given `CoinRef`. 
Returns relevant deliveries.

```
message RevokeCoinRequest {
  CoinRef of_coin = 1;
  CoinAllowanceRef revoked_allowance = 2;
  AccountAllowanceRef account_allowance = 3;
  CoinAllowanceRef coin_allowance = 4;
  Signature signature = 5;
}
 
message DecryptableRevokeCoinRequest {
  RevokeCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message RevokeCoinResponse {
  repeated DeliveryData deliveries = 1;
}
```

#### Split

Splits a `Coin` into given separate amounts, with optional parameters regarding permissions provided as needed to validate the split. 
Returns output `CoinRef`s and relevant deliveries.

```
message SplitCoinRequest {
  CoinRef of_coin = 1;
  repeated bytes amounts = 2;
  AccountAllowanceRef account_allowance = 3;
  CoinAllowanceRef coin_allowance = 4;
  Signature signature = 5;
}
 
message DecryptableSplitCoinRequest {
  SplitCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message SplitCoinResponse {
  repeated CoinRef coins = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### Transfer

Initiates a transfer of a given `Coin` to another `Account`, with optional parameters regarding refund account, expiry of the transaction state, and permissions provided as needed to validate the transfer. 
Returns a pending transaction reference and relevant deliveries.

```
message TransferCoinRequest {
  AccountRef to_account = 1;
  AccountRef refund_account = 2;
  CoinRef of_coin = 3;
  int64 expiry = 4;
  AccountAllowanceRef account_allowance = 5;
  CoinAllowanceRef coin_allowance = 6;
  Signature signature = 7;
}
 
message DecryptableTransferCoinRequest {
  TransferCoinRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message TransferCoinResponse {
  PendingTransactionRef pending_transaction = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### TransactionService

The `quilibrium.node.node.pb.TransactionService` RPC exposes a few simple operations for pending transaction management:

```
service TransactionService {
  rpc Approve(DecryptableApprovePendingTransactionRequest) returns (ApprovePendingTransactionResponse);
  rpc Reject(DecryptableRejectPendingTransactionRequest) returns (RejectPendingTransactionResponse);
}
```

#### Approve

Approves a pending transaction and returns the received `CoinRef`.

```
message ApprovePendingTransactionRequest {
  PendingTransactionRef pending_transaction = 1;
  AccountAllowanceRef account_allowance = 2;
  Signature signature = 3;
}
 
message DecryptableApprovePendingTransactionRequest {
  ApprovePendingTransactionRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message ApprovePendingTransactionResponse {
  CoinRef coin = 1;
  repeated DeliveryData deliveries = 2;
}
```

#### Reject

Rejects a pending transaction.

```
message RejectPendingTransactionRequest {
  PendingTransactionRef pending_transaction = 1;
  AccountAllowanceRef account_allowance = 2;
  Signature signature = 3;
}
 
message DecryptableRejectPendingTransactionRequest {
  RejectPendingTransactionRequest request = 1;
  KeyRing key_ring = 2;
  DeliveryMethod delivery_method = 3;
}
 
message RejectPendingTransactionResponse {
  repeated DeliveryData deliveries = 2;
}
```

## Management Scenarios

### Cold Custody

Cold custody is a process which generally takes place in a secure airgapped environment, where key generation is controlled under a formally audited process, with secure custody management of the private key material, and either the raw public key or derivation information of the public key is provided, sometimes including additional data like a signature to prove key material was generated correctly. 
Cold custody management scenarios typically consider any interaction with an online world to be a transition point where the key becomes classified as "warm" or "hot", and is no longer suitable for long term usage. 
For cold custody operations, it is therefore advisable to have an account configuration of the following:

1. The account to receive assets is an implicit account, of [`type 0`](#refs-and-accountrefs).
2. If desired to avoid users providing key info for the pending transaction, the initial signature should be a singular operation for the network, to permit a warm/hot key to perform at least [`ListPendingTransactions`](#listpendingtransactions), which can be relayed via the RPC after the cold key production process is completed.

```
AllowAccountRequest{
  OfAccount: &AccountRef{
    Account: &ImplicitAccount{
      ImplicitType: 0,
      Address: <derivedPoseidonHash>,
    },
  },
  PermittedAccount: &AccountRef{
    Account: <accountToGiveReadRights>,
  },
  PermittedOperations: []string{"account:ListPendingTransactions"},
  Signature: &Signature{
    SignatureType: 0,
    Signature: <rawSigBytes>,
    Key: &KeyRef{
      Address: <derivedPoseidonHash>,
    },
  },
}
```

3. Then monitor ongoing pending transactions from the RPC using the permitted key.

```
PendingTransactionsAccountRequest{
  Account: &AccountRef{
    Account: &ImplicitAccount{
      ImplicitType: 0,
      Address: <derivedPoseidonHash>,
    },
  },
  Allowance: &AccountAllowanceRef{
    Address: <addressOfAllowance>,
  },
  Signature: <signatureOfAccountGivenRights>,
}
```

4. When the cold key is desired to come online, it can be used with the subsequent accept/reject operation, and then 
transfer or mutual transfer operations.

### Warm/Hot Custody

Warm/Hot custody operations are more straightforward in comparison, but generally there are important limits to be concerned with in terms of assets under the custody of the key. 
In this case, accepting and rejecting the pending transactions is a matter of ongoing operations, unless the mutual transfer scenario is desired. 
The other RPC that will typically be important for monitoring is the [`GetBalance`](#getbalance) and [`ListCoins`](#listcoins) operations.

### MPC Custody

MPC custodial operations traditionally perform signatures entirely within the infrastructure of the custodian, but if there are circumstances where this is not desired, you can utilize the network's Key Management application to perform MPC signing over the network, across two or more parties. 
The output key generated can subsequently be used as an [`ImplicitAccount`](#refs-and-accountrefs) for the relevant 
operations previously 
outlined.









