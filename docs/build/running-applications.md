---
sidebar_position: 1
---

# Running Applications

Interacting with applications on Quilibrium take different forms based on the architecture of the application and how it was deployed. While each application should provide their own documentation and tooling, there are certain basic properties that can be discovered for public applications.

## Simple QCL Applications

Interacting with a simple QCL Application is achieved via [packed](../learn/oblivious-hypergraph/query-evaluator.md) messages on the network, and will vary based on whether the request is offline (already proven) or online (needs to be proven).

Given the application's address and referential inputs, the query evaluator picks up either the [rendezvous](../learn/communication/mixnet-routing.md) request or offline request, and emits state updates (if relevant) with related [dispatches](../learn/communication/e2ee.md).

## Multi-Party QCL Applications

Given their very nature, multi-party QCL applications (denoted by taking multiple inputs on the function) will always require a rendezvous request. The initiator is expected to provide the rendezvous identifier to the additional parties, how this is conveyed is up to the application implementer, but a common approach is either via QR codes or NFC for mobile-to-mobile interactions, or via direct dispatches on the network.

## Continuous Applications

Continuous applications are QCL Applications that have a scaffolding associated with chunked evaluation where distinct steps of the evaluation process occur over multiple frames on a core shard, similar to how a CPU core evaluates linear instructions in sequence over each cycle. To reduce the potential of linkability, a continuous application invocation initiates over a rendezvous request, which is retained open as a connection until the evaluation completes, with some amount of buffer to provide satisfactory privacy to the invoker.

