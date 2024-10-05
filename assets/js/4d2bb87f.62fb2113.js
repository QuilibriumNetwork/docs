"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[446],{6591:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var r=t(4848),o=t(8453);const i={sidebar_position:4},s="Advanced Node Management",a={id:"run-node/advanced-node-management",title:"Advanced Node Management",description:"Running a Node in a Cluster",source:"@site/docs/run-node/advanced-node-management.md",sourceDirName:"run-node",slug:"/run-node/advanced-node-management",permalink:"/docs/run-node/advanced-node-management",draft:!1,unlisted:!1,editUrl:"https://github.com/QuilibriumNetwork/docs/tree/main/docs/run-node/advanced-node-management.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"run",previous:{title:"RPC",permalink:"/docs/run-node/RPC"},next:{title:"Linux Configuration",permalink:"/docs/run-node/linux_configuration"}},d={},l=[{value:"Running a Node in a Cluster",id:"running-a-node-in-a-cluster",level:2},{value:"Firewalls when Clustering",id:"firewalls-when-clustering",level:3},{value:"External Server Ports with dataworker-only processes",id:"external-server-ports-with-dataworker-only-processes",level:4},{value:"Firewall considerations",id:"firewall-considerations",level:5}];function c(e){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"advanced-node-management",children:"Advanced Node Management"})}),"\n",(0,r.jsx)(n.h2,{id:"running-a-node-in-a-cluster",children:"Running a Node in a Cluster"}),"\n",(0,r.jsxs)(n.p,{children:["Follow ",(0,r.jsx)(n.a,{href:"https://quilibrium.discourse.group/t/how-to-run-nodes-in-a-cluster/687",children:"this discourse guide"})," here."]}),"\n",(0,r.jsx)(n.h3,{id:"firewalls-when-clustering",children:"Firewalls when Clustering"}),"\n",(0,r.jsx)(n.h4,{id:"external-server-ports-with-dataworker-only-processes",children:"External Server Ports with dataworker-only processes"}),"\n",(0,r.jsx)(n.p,{children:"If a server with dataworker-only processes is behind a firewall, the control process will need to communicate with the dataworker via gRPC."}),"\n",(0,r.jsx)(n.p,{children:"There are plans to change this to have a dataworker subscribe to the control process removing the need to open these ports in the future."}),"\n",(0,r.jsx)(n.h5,{id:"firewall-considerations",children:"Firewall considerations"}),"\n",(0,r.jsx)(n.p,{children:"If you are trying to connect to a remote server with a firewall, you will need to open the port to allow the control process to communicate with the dataworker, but the firewall should be configured to accept connections from the control process's server IP address as to avoid exposing the dataworker to the public internet (and somebody else using it)."}),"\n",(0,r.jsx)(n.p,{children:"If you are running the server on a private network and it's not exposed to the public internet, having a firewall is optional."}),"\n",(0,r.jsx)(n.p,{children:"The default port starting index is 40000 and is incremented for each dataworker that is running on the server."}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Port"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"Required"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"40XXX"}),(0,r.jsx)(n.td,{children:"gRPC traffic between the dataworker and the control process"}),(0,r.jsx)(n.td,{children:"Yes - if server is behind firewall"})]})})]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var r=t(6540);const o={},i=r.createContext(o);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);