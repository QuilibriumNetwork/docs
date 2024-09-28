---
sidebar_position: 1
---

# Addressing

Network addresses operate at two levels: identifying the application, then identifying the related content of the application.

## Application Address

The application's address is either the Poseidon hash of the raw circuit created by compiling the QCL, or if based on an intrinsic (an application built into the protocol itself), is produced via a "nothing-up-my-sleeve" process, generally a Poseidon hash of a unique identification string denoting the application.

## Content Address

For deployed applications, content addresses are produced via the Poseidon hash of the concatenation of the application address and the Poseidon hash of the encrypted content.
