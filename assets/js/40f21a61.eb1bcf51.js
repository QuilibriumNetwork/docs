"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[618],{4217:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var t=i(4848),o=i(8453);const r={sidebar_position:2},s="Advanced Configuration",a={id:"run-node/advanced-configuration",title:"Advanced Configuration",description:"Configuration is managed via the config.yml file, located in the config directory either specified at runtime or",source:"@site/docs/run-node/advanced-configuration.md",sourceDirName:"run-node",slug:"/run-node/advanced-configuration",permalink:"/docs/run-node/advanced-configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/QuilibriumNetwork/docs/tree/main/docs/run-node/advanced-configuration.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"run",previous:{title:"Quick Start",permalink:"/docs/run-node/quick-start"},next:{title:"RPC",permalink:"/docs/run-node/RPC"}},d={},l=[{value:"Key Section",id:"key-section",level:2},{value:"Peer-to-Peer Networking Section",id:"peer-to-peer-networking-section",level:2},{value:"Engine Section",id:"engine-section",level:2},{value:"Database Section",id:"database-section",level:2},{value:"Additional Fields",id:"additional-fields",level:2},{value:"2.0 Combined Seniority Prover Keys",id:"20-combined-seniority-prover-keys",level:2},{value:"Merging keys with qclient",id:"merging-keys-with-qclient",level:3},{value:"Merging keys in the config.yml file",id:"merging-keys-in-the-configyml-file",level:3}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"advanced-configuration",children:"Advanced Configuration"})}),"\n",(0,t.jsxs)(n.p,{children:["Configuration is managed via the ",(0,t.jsx)(n.code,{children:"config.yml"})," file, located in the config directory either specified at runtime or\ndefaulting to the ",(0,t.jsx)(n.code,{children:".config/"})," folder in the node project."]}),"\n",(0,t.jsx)(n.p,{children:"If there are multiple options listed for a configuration\nvalue, the first one is the default value."}),"\n",(0,t.jsx)(n.h2,{id:"key-section",children:"Key Section"}),"\n",(0,t.jsx)(n.p,{children:"The key section specifies the key provider configuration:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"key:\n  keyManagerType: file | mem | pkcs11 | rpc\n  keyManagerFile:\n    path: .config/keys.yml | <string>\n    createIfMissing: false | true\n    encryptionKey: <hex string>\n  keyManagerPKCS11:\n    libraryPath: <string>\n    slot: <int>\n    slotIndex: <int>\n    promptPassword: false | true\n  keyStoreRPC:\n    listenMultiaddr: <multiaddr>\n"})}),"\n",(0,t.jsx)(n.p,{children:"By default, the file-based key manager is specified. Support for PKCS11 and RPC will be enabled in a subsequent upgrade."}),"\n",(0,t.jsx)(n.h2,{id:"peer-to-peer-networking-section",children:"Peer-to-Peer Networking Section"}),"\n",(0,t.jsx)(n.p,{children:"The p2p section specifies general connectivity and BlossomSub-specific parameters:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'p2p:\n  d: 6 | <int> \u2013 optimal degree of peers per bitmask\n  dLo: 5 | <int> \u2013 lower bound of D, will attempt to graft new peers if below\n  dHi: 12 | <int> \u2013 upper bound of D, will prune if above\n  dScore: 4 | <int> \u2013 score metric used for pruning peers\n  dOut: 2 | <int> \u2013 outbound connection quota\n  historyLength: 5 | <int> \u2013 size of the message cache\n  historyGossip: 3 | <int> \u2013 size of retained gossiped message hashes\n  dLazy: 6 | <int> \u2013 number of peers gossip will be emitted to per heartbeat\n  gossipFactor: 0.25 | <float> \u2013 the factor applied to dLazy\n  gossipRetransmission: 3 | <int> \u2013 how many times a peer is allowed to re-request a message\n  heartbeatInitialDelay: 100000000 | <int> \u2013 the initial delay for a heartbeat (ns)\n  heartbeatInterval: 1000000000 | <int> \u2013 the interval between heartbeats (ns)\n  fanoutTTL: 60000000000 | <int> \u2013 TTL of fanout state (ns)\n  prunePeers: 16 | <int> \u2013 number of peers to retain for peer exchange\n  pruneBackoff: 60000000000 | <int> - amount of time a pruned peer must stay pruned\n  unsubscribeBackoff: 10000000000 | <int> \u2013 amount of time a peer should not resubscribe to a bitmask\n  connectors: 8 | <int> \u2013 number of active connection attempts for peer exchange\n  maxPendingConnections: 128 | <int> \u2013 number of pending connections\n  connectionTimeout: 30000000000 | <int> \u2013 timeout for attempting a connection\n  directConnectTicks: 300 | <int> \u2013 number of heartbeat ticks for reconnecting to a direct peer\n  directConnectInitialDelay: 1000000000 | <int> \u2013 initial delay before connecting to a direct peer\n  opportunisticGraftTicks: 60 | <int> \u2013 number of heartbeat ticks for attempting to opportunistically graft\n  opportunisticGraftPeers: 2 | <int> \u2013 number of peers to opportunistically graft\n  graftFloodThreshold: 10000000000 | <int> \u2013 threshold for graft messages after prune\n  maxIHaveLength: 5000 | <int> \u2013 maximum ihave messages to provide to a peer\n  maxIHaveMessages: 10 | <int> \u2013 maximum ihave messages to accept from a peer\n  iWantFollowupTime: 3000000000 | <int> \u2013 time to wait for an ihave following an iwant announcement\n  bootstrapPeers: [<multiaddr>,...] \u2013 list of multiaddrs to use for bootstrapping the DHT\n  listenMultiaddr: <multiaddr> \u2013 the multiaddr to listen on\n  peerPrivKey: <hex string> | <string> \u2013 the private key for the node\'s networking, or named reference\n  traceLogFile: <string> | "" \u2013 the path of the p2p networking log file, used for debugging\n  minPeers: 6 | <int> \u2013 the number of peers to maintain for non-BlossomSub networking\n'})}),"\n",(0,t.jsx)(n.h2,{id:"engine-section",children:"Engine Section"}),"\n",(0,t.jsx)(n.p,{children:"The engine section specifies attributes which define protocol engine defaults."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"engine:\n  provingKeyId: <string> \u2013 the identifier of the proving key, retrieved by the key manager\n  filter: <hex string> \u2013 the section of the bloom filter the node will listen to\n  genesisSeed: <hex string> \u2013 the seed value used for the first frame\n  maxFrames: \u2013 the maximum number of frames to retain\n  pendingCommitWorkers: \u2013 the number of goroutines used to perform worker operations\n"})}),"\n",(0,t.jsx)(n.h2,{id:"database-section",children:"Database Section"}),"\n",(0,t.jsx)(n.p,{children:"The database section specifies configurations of the underlying store."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"db:\n  path: .config/store/ | <string>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"additional-fields",children:"Additional Fields"}),"\n",(0,t.jsx)(n.p,{children:"This section denotes all additional configuration values at the root of the config file."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"logFile: <string> - the path to the log file for the node\nlistenGrpcMultiaddr: <multiaddr> - the multiaddr this node will listen on for gRPC calls \nlistenRESTMultiaddr: <multiaddr> - the multiaddr this node listen on for REST requests\n"})}),"\n",(0,t.jsx)(n.h2,{id:"20-combined-seniority-prover-keys",children:"2.0 Combined Seniority Prover Keys"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Important"})}),"\n",(0,t.jsxs)(n.p,{children:["When 2.0 is released, there will be a 24 hour stasis lock where no actions on the network can take place, and no tokens can be moved. This is the ideal time to perform prover key combination (merging), as there is ample time to get ahead of prover enrollment without being late to the stasis unlock. Merging can be done after the unlock period, but if you are running the auto-upgrade script, you will want to be sure to do this before the stasis lock period ends, as once keys have been enrolled for a prover, they cannot be merged, and the node will do this automatically after the stasis lock is lifted. QClient binaries will be simultaneously available with the updated node software, and the latest releases for qclient can always be found at ",(0,t.jsx)(n.a,{href:"https://releases.quilibrium.com/qclient-release",children:"https://releases.quilibrium.com/qclient-release"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"The upgrade to 2.0 introduces the concept of seniority with respect to precedence in joining prover rings. Seniority is a special global-level value which the network uses to resolve conflicts on enrollment attempts on a prover ring. During the first 24 hours of the upgrade's release, no transactions can happen on the network, and no prover ring enrollment occurs. Afterwards, when the network is unlocked, nodes will automatically attempt to join the prover rings they are capable of supporting, based on the data workers of the node. This process requires no action on the part of the node operator, unless you specifically wish to combine keys previously used to increase seniority."}),"\n",(0,t.jsx)(n.p,{children:"If you are upgrading to 2.0 and wish to combine historic keys from different eras of the network for improved seniority, you will need:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"For keys prior to 1.4.19, the config.yml and keys.yml files in the .config folder"}),"\n",(0,t.jsx)(n.li,{children:"After 1.4.19, the entire .config folder"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Note, you can only combine ",(0,t.jsx)(n.em,{children:"one"})," set of keys from 1.4.19 and above with older keys, and seniority of the older keys is not a pure summation \u2013 overlapping ranges are not counted multiple times, and their use for prover enrollment can only occur ",(0,t.jsx)(n.em,{children:"once"})," (you cannot use older keys twice for multiple sets of 1.4.19 keys). If you use multiple sets of keys from after 1.4.19, only one will be used for seniority for post-1.4.19 seniority."]}),"\n",(0,t.jsxs)(n.p,{children:["Each bundle of keys/store files should live in separate folders (e.g. 1.4.19 config in ",(0,t.jsx)(n.code,{children:".config/"}),", older keys in ",(0,t.jsx)(n.code,{children:".config1/"}),", ",(0,t.jsx)(n.code,{children:".config2/"}),", ",(0,t.jsx)(n.code,{children:".config3/"}),")."]}),"\n",(0,t.jsx)(n.h3,{id:"merging-keys-with-qclient",children:"Merging keys with qclient"}),"\n",(0,t.jsxs)(n.p,{children:["For the example provided, it is assumed qclient lives in the ",(0,t.jsx)(n.code,{children:"client/"})," folder alongside the ",(0,t.jsx)(n.code,{children:"node/"})," folder where the ",(0,t.jsx)(n.code,{children:".config*/"})," folders are contained:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"qclient config prover merge ../node/.config ../node/.config1 ../node/.config2 ../node/.config3\n"})}),"\n",(0,t.jsx)(n.p,{children:"Be sure to restart your node after running this command."}),"\n",(0,t.jsx)(n.p,{children:"The 1.4.19+ config folder should be the first folder in this series."}),"\n",(0,t.jsxs)(n.p,{children:["To see what seniority this combination yields (minus the effective range for the 1.4.19+ keys, which is determined after stasis unlock) without making permanent changes, append ",(0,t.jsx)(n.code,{children:"--dry-run"})," to the end of the command."]}),"\n",(0,t.jsx)(n.h3,{id:"merging-keys-in-the-configyml-file",children:"Merging keys in the config.yml file"}),"\n",(0,t.jsxs)(n.p,{children:["Under the ",(0,t.jsx)(n.code,{children:"engine"})," section noted above, add the optional field ",(0,t.jsx)(n.code,{children:"multisigProverEnrollmentPaths"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'engine:\n  # ... other items omitted ...\n  multisigProverEnrollmentPaths: [\n    "/path/to/.config1/",\n    "/path/to/.config2/",\n    "/path/to/.config3/"\n  ]\n'})}),"\n",(0,t.jsx)(n.p,{children:"Be sure to restart your node after making this configuration change."})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>a});var t=i(6540);const o={},r=t.createContext(o);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);