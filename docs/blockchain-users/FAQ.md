# FAQ

### What is Quilibrium?

Q is a protocol under active development with a core mission to secure every bit of traffic on the web. It's a censorship-resistant peer-to-peer network for app infrastructure, combining multi-party computation and privacy-preserving end-to-end encryption. Q uses a novel Proof of Meaningful Work consensus and a hypergraph structure for scalability. It aims to provide a substrate for private, censorship-resistant communication, storage, and computation at web scale.

### Is there a Q wallet?

No, Quilibrium doesn't use traditional wallets. Instead, it uses passkeys built into your browser or device. This system lets you interact directly with the network without a separate wallet app or seed phrases. It's designed to be more secure and user-friendly, working similarly to how you might log into websites with your Google account. This approach makes it easier for new users to join while keeping your digital assets safe.

### Is there a Q explorer (like Etherscan)?

Not yet, but there can be one to a limited degree.
The network has overall active proof state, prover rings, total supply.
These are things that anyone can see. 
The contents of transactions or their settled states are however invisible unless you possess relevant key material to the transaction. 
It is likely someone will build an explorer, and it will be globally less useful than Monero's explorers for transaction info, but could be made useful for individuals running multi-legged auth operations to see their own personal state.
Note the above applies only to native QUIL. 
wQUIL remains queryable via block explorers.

### What happens to wQUIL (ERC20) after the 2.0 launch?

wQUIL will remain active and transferrable/tradable as it is today. 
QUIL holders will continue to be able to bridge to wQUIL as they wish, and wQUIL holders will be able to bridge back to native QUIL with the 2.0 launch.

### What is next on the Q roadmap after 2.0?

After the 2.0 launch, the focus will be building out developer documentation and the fundamental services of the Internet that people enjoy such as file storage (i.e., S3), executable code, and domain services.

### Is there going to be a Q native DEX?

Yes.

### What are the official Q socials? How come there is no official X, Telegram, Discord?

The [Discourse forum](https://quilibrium.discourse.group/) is intended to be the primary communications channel for the near 
term. 
It was a decision early in the project to embrace as much decentralized tools as possible, and if not present, that their absence serves as a forcing function to make them exist. 
Discord especially, as the project started from a discord alternative. 

### How fast is Quilibrium?

Quilibrium was designed to support ultra-scale applications like Discord fully onchain.

### How does Quilibrium balance privacy with preventing criminal activities?

1. Using a cryptographic accumulator bundle in each coin to assert funds are not from illicit/sanctioned addresses.
2. Implementing a suboptimal default interaction model for core shards, discouraging abuse.
3. Planning to incorporate specialized intrinsics for content moderation, especially for image hosting.
4. Allowing node operators to maintain blacklists of problematic core shards, based on revealed decryption keys or compliance entity certifications.

This approach aims to preserve user privacy while providing compliance measures and discouraging criminal exploitation of the network.

### How does Quilibrium prevent centralization?

1. Not requiring expensive hardware for consensus - even a Raspberry Pi can perform necessary calculations.
2. Allowing various types of hardware to participate in mining due to flexible application complexity.
3. Enforcing minimum replication thresholds for core shards, inducing halts if they fall below the threshold.
4. Designing its architecture to alleviate centralization pressures in areas like wallets and indexers.

### What are people building on Q right now?

Not everything is ready to share publicly just yet but several public community projects include collectables/NFTs, node managers, Howler (flagship demo app, Discord alternative) and decentralized exchanges.

### What types of applications can be developed on Quilibrium?

Quilibrium will be able to host any type any application, but the first generation of applications will probably fall in these categories:
1. Social Media: image hosting, long-form content, social graphs
2. Financial: tokenized assets, DeFi
3. Common Web Dev: SPAs, file hosting

### What software knowledge will be required for applications to be developed on Quilibrium?

For network native development, QCL, as a subset of golang, is the primary language. Building new intrinsics can be done in many different languages, ideally golang, rust, or C++.\
Local simulator and SDKs are coming up shortly.

### What are the core technologies used in Quilibrium?

Here's a very short list of Quilibrium's core technologies with brief descriptions:

### What are the core technologies used in Quilibrium?

1. VDFs: For timestamping and proving block storage - [learn more](/docs/learn/block-storage/vdfs)
2. Oblivious Transfer: Enables private data querying - [learn more](/docs/learn/oblivious-hypergraph/oblivious-transfer)
3. Oblivious Hypergraph: Stores data while maintaining privacy - [learn more](/docs/learn/oblivious-hypergraph/)
4. E2EE Encryption: Secures communication between participants - [learn more](/docs/learn/communication/e2ee)
5. Triple-Ratchet: Provides secure group communication - [learn more](/docs/learn/communication/mixnet-routing)
6. SLRP: Allows anonymous message routing - [learn more](/docs/learn/communication/mixnet-routing)
7. RPM: Enhances anonymity in message routing - [learn more](/docs/learn/communication/mixnet-routing)
8. BlossomSub: Efficiently propagates messages across the network - [learn more](/docs/learn/communication/p2p-communication)

These technologies work together to create a secure, private, and efficient decentralized network.


