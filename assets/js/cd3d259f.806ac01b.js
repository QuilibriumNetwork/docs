"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[901],{9460:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>l});var r=t(4848),i=t(8453);const s={sidebar_position:1},o="Quick Start",d={id:"run-node/quick-start",title:"Quick Start",description:"System Requirements",source:"@site/docs/run-node/quick-start.md",sourceDirName:"run-node",slug:"/run-node/quick-start",permalink:"/docs/run-node/quick-start",draft:!1,unlisted:!1,editUrl:"https://github.com/QuilibriumNetwork/docs/tree/main/docs/run-node/quick-start.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"run",next:{title:"Advanced Configuration",permalink:"/docs/run-node/advanced-configuration"}},a={},l=[{value:"System Requirements",id:"system-requirements",level:2},{value:"Supported Operating Systems",id:"supported-operating-systems",level:3},{value:"Minimum Hardware Requirements",id:"minimum-hardware-requirements",level:3},{value:"Hardware Selection",id:"hardware-selection",level:4},{value:"Network Requirements",id:"network-requirements",level:3},{value:"Default Ports to Open on Firewall",id:"default-ports-to-open-on-firewall",level:4},{value:"Autorun",id:"autorun",level:2},{value:"Backups",id:"backups",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"quick-start",children:"Quick Start"})}),"\n",(0,r.jsx)(n.h2,{id:"system-requirements",children:"System Requirements"}),"\n",(0,r.jsx)(n.h3,{id:"supported-operating-systems",children:"Supported Operating Systems"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Operating System"}),(0,r.jsx)(n.th,{children:"Architecture"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Linux"}),(0,r.jsx)(n.td,{children:"ARM, x86"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"MacOS"}),(0,r.jsx)(n.td,{children:"ARM"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Windows"}),(0,r.jsx)(n.td,{children:"Not Supported"})]})]})]}),"\n",(0,r.jsx)(n.h3,{id:"minimum-hardware-requirements",children:"Minimum Hardware Requirements"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Component"}),(0,r.jsx)(n.th,{children:"Minimum Requirements"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"CPU"}),(0,r.jsx)(n.td,{children:"At least 4 logical cores"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"RAM"}),(0,r.jsx)(n.td,{children:"8 GB"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"SSD"}),(0,r.jsx)(n.td,{children:"250 GB"})]})]})]}),"\n",(0,r.jsx)(n.p,{children:"A Quilibrium node will run on anything that has at least 4 logical cores and 8GB of RAM."}),"\n",(0,r.jsx)(n.p,{children:"It should be noted that you will need sufficient RAM and storage to avoid running out of memory and disk space while running the node and should scale your hardware evenly when you upgrade components or cores used. For example:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"if you have 4 cores, you should have at least 8GB of RAM"}),"\n",(0,r.jsx)(n.li,{children:"if you have 8 cores, you should have at least 16GB of RAM, etc."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"The general rule of thumb is: 1CPU to 2GB Ram."}),"\n",(0,r.jsx)(n.p,{children:"Storage may vary depend on if the node will be used to store data or if it will be a compute-only node. Many people currently opt for 1TB as a default, but this is strictly required."}),"\n",(0,r.jsx)(n.p,{children:"A logical core is also known as a hyperthread (or individual core if not hyperthreaded) or vCPU on virtual machines."}),"\n",(0,r.jsx)(n.p,{children:"GPUs are not currently used in any parts of the node process."}),"\n",(0,r.jsx)(n.h4,{id:"hardware-selection",children:"Hardware Selection"}),"\n",(0,r.jsx)(n.p,{children:"The minimum hardware requirements above are just a bare-minimum.  Any node that uses just the minimum will find that it will very slow and rewards minimal. Using minimums may be useful for setting up a local testnet for application and/or protocol development, testing, or for experimentation purposes."}),"\n",(0,r.jsx)(n.p,{children:"You can increase your performance by using servers or VDS plans with more cores (and the sufficient amount of RAM for each core), as well as finding hardware combinations that perform better at high-performance CPU workloads."}),"\n",(0,r.jsx)(n.p,{children:"Many people use VDS's or rent servers from service providers.  However, using VPS services to run a node is not recommnded at all."}),"\n",(0,r.jsx)(n.p,{children:"Higher clock-speed CPUs are generally faster for certain workloads, and more modern CPUs may have additional features that can improve performance."}),"\n",(0,r.jsx)(n.p,{children:"More cores may not always produce better results, especially when considering older hardware, but generally when comparing two servers with similar architecture and clock-speed, you will get better overall performance with more cores."}),"\n",(0,r.jsx)(n.p,{children:"For example, when looking at comparable price point and ages of CPUs between Intel and AMD, it has been found that AMD CPUs have historically provided better performance for Quilibrium nodes."}),"\n",(0,r.jsx)(n.h3,{id:"network-requirements",children:"Network Requirements"}),"\n",(0,r.jsx)(n.p,{children:"The bandwidth requirements are case-dependent."}),"\n",(0,r.jsx)(n.p,{children:"Higher bandwidth is not necessarily better, as the amount needed is more around supply/demand and how much storage the shard is using that the node is proving over."}),"\n",(0,r.jsx)(n.p,{children:"In the case that a shard has a high amount of storage, a node would need more bandwidth to send/receive the data on demand."}),"\n",(0,r.jsx)(n.h4,{id:"default-ports-to-open-on-firewall",children:"Default Ports to Open on Firewall"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Port"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"Required"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"22*"}),(0,r.jsx)(n.td,{children:"Allows for personal SSH traffic in the server"}),(0,r.jsx)(n.td,{children:"No, but recommended if needing to connect to the server remotely"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"8336"}),(0,r.jsx)(n.td,{children:"UDP/TCP traffic for communication with the rest of the network"}),(0,r.jsx)(n.td,{children:"Yes"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"8337*"}),(0,r.jsx)(n.td,{children:"Allows for direct gRPC communication with the node, will allow external applications to connect to the node"}),(0,r.jsx)(n.td,{children:"No"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"8338*"}),(0,r.jsx)(n.td,{children:"Allows for REST API communication with the node, will allow external applications to connect to the node"}),(0,r.jsx)(n.td,{children:"No"})]})]})]}),"\n",(0,r.jsx)(n.p,{children:"*Note: this is not used by the node application, so only open if needed for personal requirements."}),"\n",(0,r.jsxs)(n.p,{children:["**Note: These ports are not required to be open to the public. If the ",(0,r.jsx)(n.code,{children:"listenGrpcMultiaddr"})," and ",(0,r.jsx)(n.code,{children:"listenRESTMultiaddr"})," are not set, then the node application will not be listening on these ports anyways."]}),"\n",(0,r.jsx)(n.h2,{id:"autorun",children:"Autorun"}),"\n",(0,r.jsx)(n.p,{children:"The release autorun script will automatically download the latest release binary, run the node and periodically check for new releases. You can run the script as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git clone --depth 1 --branch release https://github.com/QuilibriumNetwork/ceremonyclient.git\ncd ceremonyclient/node\n# Inspect the contents of the `release_autorun.sh` script before executing it\n./release_autorun.sh\n"})}),"\n",(0,r.jsxs)(n.p,{children:["This script is intended to help get started quickly, but for robust deployments it is recommended to use some service orchestration solution (e.g. ",(0,r.jsx)(n.code,{children:"systemd"})," on Linux)."]}),"\n",(0,r.jsx)(n.h2,{id:"backups",children:"Backups"}),"\n",(0,r.jsx)(n.p,{children:"The node's configuration, private keys and database must be backed up in order to claim rewards."}),"\n",(0,r.jsxs)(n.p,{children:["If you followed the instructions in the ",(0,r.jsx)(n.a,{href:"#autorun",children:"Autorun"})," section, this data will be stored in the ",(0,r.jsx)(n.code,{children:"ceremonyclient/node/.config"})," directory. It's recommended to back up this entire directory."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:".config/keys.yml"})," and ",(0,r.jsx)(n.code,{children:".config/config.yml"})," files contain private keys and should be encrypted in backups. If you back up the entire directory, it's easiest to encrypt the entire backup."]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>d});var r=t(6540);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);