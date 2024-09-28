---
sidebar_position: 2
---

# Compiling to OT Circuits

Quilibrium utilizes Oblivious Transfer, a technique for providing garbled circuits that enable computation to confidentially and securely occur between two or more parties, as well as provide a substrate for proof creation and verification that the circuit's execution and outputs are correct for the application.

Quilibrium utilizes a subset of golang, called Q Compute Language (QCL), and an associated compiler, Bedlam, for producing these circuits, as well as defining the schema of the data for serialization on the network, and any relationships the data may have over the [oblivious hypergraph](../learn/oblivious-hypergraph/rdf-storage.md).

## Types

The primary differences between QCL and golang are:

- Primitive types must have bounded sizes, e.g. int -> int8, int16, int32.
- Arrays must also have bounded sizes, e.g. []byte -> \[8]byte.
- Stored types should have RDF schema tags.

Bedlam also has support for testing the evaluation of circuits without having to deploy the application to the network first, however this has limitations as there is no corresponding hypergraph to retrieve from or store to, and so the input references must be provided as the serialized data expected for the reference.

## RDF

Structs that are stored on the hypergraph must have corresponding [RDF](../learn/oblivious-hypergraph/rdf-storage.md) schema. Generally, it is easier to start from the RDF, and use the generated QCL types. As an example, we will define a simple RDF class holding 256 bytes, saving it to a file named `byteblock.rdf`:

```
BASE <https://types.quilibrium.com/schema-repository/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX qcl: <https://types.quilibrium.com/qcl/>
PREFIX byteblock: <https://types.quilibrium.com/schema-repository/examples/byteblock/>

byteblock:ByteBlock a rdfs:Class;
  rdfs:label "an example RDF class".
byteblock:Bytes a rdfs:Property;
  rdfs:domain qcl:ByteArray;
  qcl:size 256;
  qcl:order 0;
  rdfs:range byteblock:ByteBlock.
```

Running `qclient schema qclgen byteblock.rdf` will return `byteblock.qcl`, which contains the boilerplate hypergraph serialization implementations:

```
package main

type ByteBlock struct {
  Bytes [256]byte `rdf:"byteblock:Bytes"`
}

func UnmarshalByteBlock(payload [256]byte) ByteBlock {
  result := ByteBlock{}
  result.Bytes = payload[0:256]
  return result
}

func MarshalByteBlock(obj ByteBlock) [256]byte {
  buf := make([]byte, 256)
  copy(buf[0:256], obj.ByteBlock)
  return buf
}
```

From this you can add your `main` entrypoint, which can emit `hypergraph.CreateExtrinsic`, `hypergraph.UpdateExtrinsic`, and `hypergraph.DeleteExtrinsic` types related to storage operations of the defined struct.

## 2PC vs MPC

While applications are 2PC by default, you may have a specific need to allow multiple parties outside of the requestor and a prover to jointly compute an application. QCL supports this with simple syntax. The main method entrypoint for your application takes at a minimum, an input argument by the initiator, and a relay argument for the base 2PC scenario:

```
package main

func main(input int8, relay hypergraph.Network) int8 {
  return input + 2;
}
```

For MPC applications, you define the parties via additional arguments (omitting the relay argument):

```
package main

func main(initiatorInput int8, secondInput int8) bool {
  return initiatorInput > secondInput;
}
```

Note: The hypergraph store types handle encryption and settlement of data, and return reference addresses. The return values in QCL are exposed to all participants as outputs.