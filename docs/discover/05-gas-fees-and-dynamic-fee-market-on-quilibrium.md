# Gas Fees and Dynamic Fee Market on Quilibrium

Quilibrium’s gas fee system is built around a **dynamic fee market** that adapts to network usage. Fees are calculated based on three key factors:

1. **Data Size**: The amount of data the transaction processes or stores.
2. **Execution Complexity**: The computational effort needed for the transaction.
3. **Proof Size**: The size of the cryptographic proof generated to verify the transaction.

Quilibrium’s fee market is a **flexible, fair system** designed to align transaction costs with their real impact on the network. It prevents abuse, discourages spam, and ensures fees adapt dynamically to changing conditions, keeping the network efficient and accessible for all users.

### How Fees Are Calculated

* **Baseline Fee**: The starting cost is 0.000000000125 QUIL per byte. This ensures every transaction has a minimum cost, even for small operations.
* **Impact on Emissions**: Fees increase if a transaction significantly adds to network storage or complexity, as this affects emissions (new QUIL generated for network participants). Actions that reduce state, like deleting data, are free.
* **Dynamic Adjustments**: The fee includes costs for execution and proof sizes, which are calculated after the transaction starts. If a transaction is too complex or large, it may fail, with forfeited fees discouraging abuse.

### The Fee Market and Multiplier System

To keep fees fair, Quilibrium uses a **fee multiplier**. Here’s how it works:

* Provers (nodes processing transactions) commit to a fee multiplier during each proving window (a short time interval).
* The **lowest multiplier** among provers in a "ring" (a set of provers for a shard) becomes the cap for all fees in that ring.
* This encourages competition: if fees get too high, new provers can join the ring and lower the multiplier.

#### Why Is This Important?

Without the multiplier system, fees could spike in high-demand situations, making transactions expensive or inaccessible. The **multiplier ensures fees stay balanced**, even if provers attempt to exploit demand. Provers can’t change their multipliers instantly—they must wait until the next proving window—adding stability to the market.

### How High Can Fees Get?

* Simple token transactions will have minimal fees because they use little data and processing.
* Complex operations with high data or proof demands will cost more. The more impact a transaction has on the network’s state or emissions, the higher the fee.
* In extremely high-demand scenarios, fees may rise temporarily, but the multiplier system ensures competition keeps prices reasonable.

:::info

For a higher level technical explanation on the dynamic fee market, please [read this article](https://paragraph.xyz/@quilibrium.com/dynamic-fee-markets).

:::

