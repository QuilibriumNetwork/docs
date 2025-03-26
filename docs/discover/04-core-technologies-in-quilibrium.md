# Core Technologies in Quilibrium

Quilibrium's architecture is built on a foundation of advanced cryptographic and distributed systems technologies. These core components work in concert to create a secure, private, and efficient decentralized network. The following list outlines the key technologies that power Quilibrium, each addressing specific challenges in data privacy, secure communication, anonymity, and efficient data management.

:::info

To dive deeper into the Quilibrium tech, check out this great [ELI5/ELI12 article](https://paragraph.xyz/@quilibrium.com/eli5-quilibrium) by [Cassandra Heart](https://warpcast.com/cassie).

:::

### VDFs (Verifiable Delay Functions)

**Use:** Timestamping and creating proofs of block storage.

Think of a VDF as a special puzzle that takes a specific amount of time to solve, like a Rubik's cube that requires exactly 5 minutes to complete. No matter how many people try to solve it simultaneously, it still takes 5 minutes. This is useful for proving that a certain amount of time has passed.

### Oblivious Transfer (OT)

**Use:** Privacy-preserving computation and querying of the oblivious hypergraph.

Think of a magic card trick where you pick a card without the magician seeing it, and somehow they still know what card you picked without revealing the other cards. OT allows one party to transfer one of potentially many pieces of information to another party, but remain oblivious as to which piece was transferred.

### Oblivious Hypergraph (OHG)

**Use:** Central data structure for storing and querying data while maintaining privacy.

Imagine a complex web of interconnected ideas, but each person can only see the parts relevant to them. It's like a giant, multidimensional connect-the-dots puzzle where each person has their own unique view. This allows for complex data relationships while maintaining privacy.

### E2EE Encryption (End-to-End Encryption)

**Use:** Ensuring secure communication between network participants.

Imagine sending a letter in a locked box. Only you and the recipient have the key. Even the postal service can't read the contents. That's E2EE - your message is secure from the moment you send it until it's received and decrypted by the intended recipient.

### Triple-Ratchet

**Use:** Secure group communication with perfect forward secrecy.

Picture a group of friends with a special set of walkie-talkies. Every time they communicate, the devices automatically change their encryption codes. Even if someone intercepts one message, they can't decode future or past messages. That's how Triple-Ratchet keeps group communications secure.

### Shuffled Lattice Routing Protocol (SLRP)

**Use:** Providing anonymous routing of messages within the network.

Think of a postal system where each letter goes through a series of random post offices before reaching its destination. At each stop, it's mixed with other letters. This makes it nearly impossible to trace the letter's origin, ensuring anonymous communication.

### RPM (Random Permutation Mixnet)

**Use:** Enhancing anonymity in message routing.

Picture a giant bingo tumbler that thoroughly mixes messages before sending them out. This ensures that no one can trace which message came from where, providing anonymity for senders and receivers.

### BlossomSub (modified GossipSub)

**Use:** Efficient and secure message propagation across the network.

Imagine a game of telephone, but more efficient. Instead of whispering to just one person, each player tells a few others, quickly spreading the message through the network. BlossomSub does this for data, but with added security and efficiency features.
