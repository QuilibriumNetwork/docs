---
sidebar_position: 2
---

# Advanced Configuration

Configuration is managed via the `config.yml` file, located in the config directory either specified at runtime or 
defaulting to the `.config/` folder in the node project. 

If there are multiple options listed for a configuration 
value, the first one is the default value.

## Key Section

The key section specifies the key provider configuration:

```
key:
  keyManagerType: file | mem | pkcs11 | rpc
  keyManagerFile:
    path: .config/keys.yml | <string>
    createIfMissing: false | true
    encryptionKey: <hex string>
  keyManagerPKCS11:
    libraryPath: <string>
    slot: <int>
    slotIndex: <int>
    promptPassword: false | true
  keyStoreRPC:
    listenMultiaddr: <multiaddr>
```

By default, the file-based key manager is specified. Support for PKCS11 and RPC will be enabled in a subsequent upgrade.

## Peer-to-Peer Networking Section

The p2p section specifies general connectivity and BlossomSub-specific parameters:

```
p2p:
  d: 6 | <int> – optimal degree of peers per bitmask
  dLo: 5 | <int> – lower bound of D, will attempt to graft new peers if below
  dHi: 12 | <int> – upper bound of D, will prune if above
  dScore: 4 | <int> – score metric used for pruning peers
  dOut: 2 | <int> – outbound connection quota
  historyLength: 5 | <int> – size of the message cache
  historyGossip: 3 | <int> – size of retained gossiped message hashes
  dLazy: 6 | <int> – number of peers gossip will be emitted to per heartbeat
  gossipFactor: 0.25 | <float> – the factor applied to dLazy
  gossipRetransmission: 3 | <int> – how many times a peer is allowed to re-request a message
  heartbeatInitialDelay: 100000000 | <int> – the initial delay for a heartbeat (ns)
  heartbeatInterval: 1000000000 | <int> – the interval between heartbeats (ns)
  fanoutTTL: 60000000000 | <int> – TTL of fanout state (ns)
  prunePeers: 16 | <int> – number of peers to retain for peer exchange
  pruneBackoff: 60000000000 | <int> - amount of time a pruned peer must stay pruned
  unsubscribeBackoff: 10000000000 | <int> – amount of time a peer should not resubscribe to a bitmask
  connectors: 8 | <int> – number of active connection attempts for peer exchange
  maxPendingConnections: 128 | <int> – number of pending connections
  connectionTimeout: 30000000000 | <int> – timeout for attempting a connection
  directConnectTicks: 300 | <int> – number of heartbeat ticks for reconnecting to a direct peer
  directConnectInitialDelay: 1000000000 | <int> – initial delay before connecting to a direct peer
  opportunisticGraftTicks: 60 | <int> – number of heartbeat ticks for attempting to opportunistically graft
  opportunisticGraftPeers: 2 | <int> – number of peers to opportunistically graft
  graftFloodThreshold: 10000000000 | <int> – threshold for graft messages after prune
  maxIHaveLength: 5000 | <int> – maximum ihave messages to provide to a peer
  maxIHaveMessages: 10 | <int> – maximum ihave messages to accept from a peer
  iWantFollowupTime: 3000000000 | <int> – time to wait for an ihave following an iwant announcement
  bootstrapPeers: [<multiaddr>,...] – list of multiaddrs to use for bootstrapping the DHT
  listenMultiaddr: <multiaddr> – the multiaddr to listen on
  peerPrivKey: <hex string> | <string> – the private key for the node's networking, or named reference
  traceLogFile: <string> | "" – the path of the p2p networking log file, used for debugging
  minPeers: 6 | <int> – the number of peers to maintain for non-BlossomSub networking
```

## Engine Section

The engine section specifies attributes which define protocol engine defaults.

```
engine:
  provingKeyId: <string> – the identifier of the proving key, retrieved by the key manager
  filter: <hex string> – the section of the bloom filter the node will listen to
  genesisSeed: <hex string> – the seed value used for the first frame
  maxFrames: – the maximum number of frames to retain
  pendingCommitWorkers: – the number of goroutines used to perform worker operations
```

## Database Section

The database section specifies configurations of the underlying store.

```
db:
  path: .config/store/ | <string>
```

## Additional Fields

This section denotes all additional configuration values at the root of the config file.

```
logFile: <string>
listenGrpcMultiaddr: <multiaddr> - the multiaddr this node will listen on for gRPC calls 
listenRESTMultiaddr: <multiaddr> - the multiaddr this node listen on for REST requests
```

## 2.0 Combined Seniority Prover Keys

If you are upgrading to 2.0 and wish to combine historic keys from different eras of the network for improved seniority, you will need:

- For keys prior to 1.4.19, the config.yml and keys.yml files in the .config folder
- After 1.4.19, the entire .config folder

Note, you can only combine _one_ set of keys from 1.4.19 and above with older keys, and seniority of the older keys is not a pure summation – overlapping ranges are not counted multiple times, and their use for prover enrollment can only occur _once_ (you cannot use older keys twice for multiple sets of 1.4.19 keys).

Each bundle of keys/store files should live in separate folders (e.g. 1.4.19 config in `.config/`, older keys in `.config1/`, `.config2/`, `.config3/`).

### Via qclient:

For the example provided, it is assumed qclient lives in the `client/` folder alongside the `node/` folder where the `.config*/` folders are contained:

```
qclient config prover merge ../node/.config ../node/.config1 ../node/.config2 ../node/.config3
```

The 1.4.19+ config folder should be the first folder in this series.

To see what seniority this combination yields (minus the effective range for the 1.4.19+ keys, which is determined after stasis unlock) without making permanent changes, append `--dry-run` to the end of the command.

### Via configuration:

Under the `engine` section noted above, add the optional field `multisigProverEnrollmentPaths`:

```
engine:
  # ... other items omitted ...
  multisigProverEnrollmentPaths: [
    "/path/to/.config1/",
    "/path/to/.config2/",
    "/path/to/.config3/"
  ]
```
