# Quilibrium Tokenomics

Quilibrium employs a generational token issuance model that dynamically adjusts based on network-wide computational progress, ensuring long-term sustainability and decentralization. Instead of a fixed emission schedule, new $QUIL emissions are triggered when the network surpasses predefined computational milestones.

## $QUIL Token

:::info

$QUIL is a utility token designed for use within the Quilibrium network. It is not intended for speculation, investment, or financial gain. Quilibrium Inc. does not endorse or facilitate any trading activities related to $QUIL or $wQUIL.

:::

$QUIL native tokens can only be mined. There was no allocation to VCs, no premine, and no airdrops.\
$wQUIL is the official token bridged to Ethereum, contract: `0x8143182a775c54578c8b7b3ef77982498866945d`

## Token Emissions for the Current Generation

The current generation will last until 100 millions iterations are reached. This is roughly estimated to happen around 2033.

* Circulating Supply (10.02.25): \~ 1.3 Billions - please see the [dashboard](https://dashboard.quilibrium.com/) for the most updated value
* Inflation: 1.6 to 1.7 Billions in 2033 (estimation)
* Token emissions diminish according to network growth (storage demands)
* As the network grows and emissions flatten out in each generation, transaction fees play a bigger role in miner incentives. See also [Gas fees and dynamic fee market on Quilibrium](/docs/discover/05-gas-fees-and-dynamic-fee-market-on-quilibrium.md).

![Q emissions curve chart](/static/img/docs/discover/Q-emissions-curve.jpg)
*The above chart is a conservative estimation, based on comments from the development team. Actual emission rate will depend on network storage demands.*

## Adaptive Emissions and Generational Thresholds

Quilibrium’s emission model prevents mining centralization by ensuring that emissions adjust as computing power improves. Instead of a fixed schedule, emissions are tied to network difficulty, which increases as better hardware, optimized software, and improved algorithms enhance computational efficiency.

Each generational milestone temporarily increases emissions before tapering off again. This prevents a scenario where only the most advanced miners can compete, as seen in Bitcoin.

Quilibrium’s model ensures that both early and later participants remain incentivized, fostering long-term decentralization.

:::info

To understand why this adaptive issuance model is important, please read [How does Quilibrium maintain decentralization?](/docs/discover/06-how-does-quilibrium-maintain-decentralization.md)

:::

### Current and Future Generations

* **Generation 1 (Current):** Launched with \~10,000 iterations per \~10 seconds. As of 12.02.2025, iteration speed has increased to \~160,000, a 16x improvement.
* **Generation 2 (100M iterations):** Estimated emissions reset in 2033.
* **Generation 3 (1T iterations):** Next milestone after Gen 2.
* **Future Generations:** Growth follows an exponential scale (e.g., 10 quadrillion iterations, etc.).

Each generational reset results in a temporary emissions increase before gradually declining again, ensuring sustained miner incentives and long-term network security.

<details>
<summary>What are "iterations"?</summary>

An **iteration** in Quilibrium refers to a single step in the network’s **Verifiable Delay Function (VDF)**, which is a way to prove that time has passed.

Since this function cannot be sped up by running multiple calculations in parallel, each iteration must be completed one after another, making it a reliable measure of computational progress.

The faster the network can process these iterations, the more powerful the hardware running it has become. When the network reaches a set number of iterations, like **100 million**, it triggers a new generation of token emissions.

Essentially, an iteration is a basic unit of work that helps secure the network and determines when new tokens are released.
</details>

:::info

For a detailed technical explanation please read this article on [Proof of Meaningful Work (PoMW)](https://paragraph.xyz/@quilibrium.com/proof-of-meaningful-work).

:::