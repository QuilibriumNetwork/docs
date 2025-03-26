
# How does Quilibrium maintain decentralization?

One of the biggest problems in **blockchain mining** is **centralization**—where a small number of **powerful miners** dominate the network and control most of the rewards. This happens in **Bitcoin** and other Proof-of-Work (PoW) systems because of how mining rewards are distributed.

Quilibrium **2.1** introduces a new model called **Proof of Meaningful Work (PoMW)** that **fundamentally changes how mining works**. Instead of allowing **a few large players to dominate**, it ensures that mining rewards are **fairly distributed among many participants**, keeping the network **decentralized, secure, and resistant to manipulation**.

## **The Problem: How Traditional PoW Leads to Centralization**

### **How Bitcoin & Other PoW Networks Become Centralized**

* In **Bitcoin**, miners compete to solve **mathematical puzzles** to add blocks to the blockchain.
* The **first miner to solve the puzzle wins** and gets the entire reward.
* **Larger mining pools** (with more computing power) have a **higher chance of winning**, so:
  * **Small miners** almost **never win** and **join large mining pools** to get a share of rewards.
  * Over time, **a few mining pools control most of the network**.
  * Today, **the top 6 Bitcoin mining pools** control **over 80% of the network**, making it less decentralized.

### **Why This is Dangerous**

* **51% Attack Risk** – If one or two mining pools control the majority of the network, they could **manipulate transactions** or **double-spend coins**.
* **Power Concentration** – A few large entities effectively **decide how the network operates**.
* **Hardware Barrier** – Small miners **can’t compete**, making mining **only profitable for big corporations**.

### **Quilibrium’s Solution: Proof of Meaningful Work (PoMW)**

Quilibrium **2.1** completely redesigns the mining system to prevent these issues. Instead of a **single winner-takes-all model**, it:

1. **Splits mining tasks into small, unique shards**
2. **Makes every miner do verifiable work**, preventing fake participation
3. **Incentivizes decentralization by preventing mining pool dominance**

## **How Quilibrium 2.1 Prevents Centralization**

### **Data Sharding – Distributing Mining Across the Network**

Quilibrium 2.1 introduces a **sharded mining structure**, where the network is broken into **millions of potential shards** (approximately 2.5 million at the transition phase). Instead of having all miners compete to process the same dataset, **data is distributed across multiple shards, each containing a portion of the network state**. Miners can choose which shards to work on, but each shard has its own **unique proof structure**, making it computationally expensive to dominate multiple shards at once.

Miners working within a shard must generate **specific cryptographic proofs** related to the data in that shard. The nature of these proofs ensures that simply increasing computational power does not guarantee dominance, as miners must **store and process verifiable data unique to each shard**. While miners are not strictly assigned to a single shard, **the cost and complexity of proving across multiple shards create a natural decentralization effect**.

#### Why This Prevents Centralization:

* **Large mining pools cannot dominate the network easily** because each shard requires **separate verifiable work**, making it inefficient for a single entity to take control.
* **Smaller miners remain competitive** since they are not forced to compete with the entire network, but rather work within **localized proof structures** that make it harder for large players to outscale them.
* **Sharded proofs and encryption mechanisms prevent miners from faking multiple identities**, ensuring that decentralization remains intact.

### **Difficulty Calibration – Adapting Mining Based on Hardware**

One issue with **Bitcoin** is that it only rewards those who have **the most powerful and expensive computers**.

In Quilibrium **2.1**, the **difficulty of mining adjusts based on the hardware used**. **Low-power miners (like Raspberry Pi devices) can still participate**, but they **work on smaller tasks**. High-power machines **are given more difficult tasks**, but **they don’t dominate all rewards**.

#### Why This Prevents Centralization:

* **People with basic computers can still mine**, making Quilibrium more accessible.
* No single **type of hardware gives an unfair advantage**, reducing the risk of centralization.

## **Adaptive Issuance Model – Preventing Long-Term Centralization**

One of Bitcoin’s biggest challenges is the gradual reduction of mining rewards, which makes it increasingly difficult for new miners to compete. Over time, as profitability declines, mining becomes concentrated among those with the most powerful and efficient hardware, leading to centralization and a weaker security model. This is often referred to as Bitcoin’s "shrinking security budget" problem, where fewer active miners result in a less secure and more vulnerable network.

Quilibrium addresses this issue with a **dynamic issuance model** that adjusts mining rewards based on real-time computational progress rather than fixed time-based halvings. Instead of cutting emissions at set intervals, Quilibrium uses **Verifiable Delay Functions (VDFs)** to track the network’s processing power. These VDFs measure how quickly computations are performed, allowing the protocol to unlock new emissions phases when the network surpasses predefined computational milestones.

For example, when the number of verified computations reaches **100 million iterations**, Quilibrium will trigger the next generation of emissions, creating a temporary spike in mining rewards before they gradually taper off again. This is estimated to happen around 2033, and it ensures that mining remains profitable as technology advances, preventing an arms race where only those with the most sophisticated hardware can compete.

### **How This Prevents Centralization**

* **Sustained Mining Incentives:** Rewards adjust dynamically, preventing a sharp decline in miner participation over time.
* **Fair Entry for New Miners:** Unlike Bitcoin, where later miners face diminishing returns, Quilibrium ensures that new participants still have opportunities to mine profitably.
* **Balanced Rewards Across Generations:** Mining incentives are tied to actual network progress, preventing early adopters from having an unfair advantage over time.

By making token issuance responsive to real-world computational advancements rather than enforcing artificial supply cuts, Quilibrium creates a more sustainable, decentralized, and secure mining ecosystem.

info:::

To learn more about this adaptive issuance model, see [Quilibrium Tokenomics](/docs/discover/02-quilibrium-tokenomics.md).

:::
