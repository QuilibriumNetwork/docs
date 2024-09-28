"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[775],{6204:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>o,contentTitle:()=>d,default:()=>x,frontMatter:()=>l,metadata:()=>t,toc:()=>h});var i=r(4848),n=r(8453);r(6540);const c=()=>(0,i.jsx)("div",{className:"learn-page text-left flex md:flex-row flex-col text-slate",children:(0,i.jsxs)("div",{className:"flex-1",children:[(0,i.jsx)("p",{className:"pb-4 text-justify",children:"Oblivious Transfer is a cryptographic technique in which a sender and a receiver engage in a series of messages between one another such that a sender has messages which a receiver can request, the receiver makes a choice, and prepares a response which the sender consumes and applies to the messages being sent but is unaware of the choice made by the receiver, then responds with the choice-applied message data such that upon receipt by the receiver, they are able to consume the intended message, but gain no awareness of the contents of the other messages."}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"We begin by explaining some base concepts of oblivious transfer protocols such that it becomes easier to follow along in the broader construction."}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Simplest OT"}),(0,i.jsxs)("p",{className:"text-justify",children:["In ",(0,i.jsx)("a",{href:"https://eprint.iacr.org/2015/267.pdf",children:'"The Simplest Protocol for Oblivious Transfer"'}),", Chou and Orlandi defined a new approach to oblivious transfer in which the construction relied only on the same assumptions as Diffie-Hellman. The approach is summarized below:"]}),(0,i.jsxs)("div",{className:"p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']",children:[(0,i.jsx)("div",{children:"Simplest OT:"}),(0,i.jsxs)("ol",{className:"list-decimal pl-6",children:[(0,i.jsxs)("li",{children:["Given a sender has two messages, ",(0,i.jsxs)("code",{children:["m",(0,i.jsx)("sub",{children:"0"}),", m",(0,i.jsx)("sub",{children:"1"})]}),", and a receiver has a choice bit ",(0,i.jsx)("code",{children:"c"}),", both parties sample a random private scalar ",(0,i.jsxs)("code",{children:["x \u2190 \ud835\udd3d",(0,i.jsx)("sub",{children:"p"})]})," The sender\u2019s private scalar will be denoted as ",(0,i.jsx)("code",{children:"a"}),", the receiver\u2019s private scalar will be denoted as ",(0,i.jsx)("code",{children:"b"}),"."]}),(0,i.jsxs)("li",{children:["The sender calculates the point ",(0,i.jsx)("code",{children:"A = a \xb7 G"}),", and sends this to the receiver."]}),(0,i.jsxs)("li",{children:["If the receiver\u2019s choice bit is ",(0,i.jsx)("code",{children:"0"}),", the receiver replies with ",(0,i.jsx)("code",{children:"B = b \xb7 G"}),". If ",(0,i.jsx)("code",{children:"1"}),", the receiver replies with ",(0,i.jsx)("code",{children:"B = A + (b \xb7 G)"}),"."]}),(0,i.jsxs)("li",{children:["The sender calculates two keys, ",(0,i.jsxs)("code",{children:["k",(0,i.jsx)("sub",{children:"0"})," = H(a \xb7 B)"]}),", and ",(0,i.jsxs)("code",{children:["k",(0,i.jsx)("sub",{children:"1"})," = H(a \xb7 (B \u2212 A))"]}),", then encrypts ",(0,i.jsxs)("code",{children:["m",(0,i.jsx)("sub",{children:"0"})]})," with ",(0,i.jsxs)("code",{children:["k",(0,i.jsx)("sub",{children:"0"})]}),", ",(0,i.jsxs)("code",{children:["m",(0,i.jsx)("sub",{children:"1"})]})," with ",(0,i.jsxs)("code",{children:["k",(0,i.jsx)("sub",{children:"1"})]}),", and sends both encrypted messages to the receiver."]}),(0,i.jsxs)("li",{children:["The receiver calculates ",(0,i.jsxs)("code",{children:["k",(0,i.jsx)("sub",{children:"c"})," = H(b \xb7 A)"]}),", and then uses this value to decrypt their chosen message."]})]})]}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"Because neither party has the other party\u2019s private scalar, provided the discrete logarithm assumption holds, it is impossible for the receiver to calculate the other message\u2019s key, and impossible for the sender to calculate the receiver\u2019s choice."}),(0,i.jsx)("p",{className:"text-justify",children:"Simplest OT is capable of only delivering a singular choice of two messages, and has to be re-evaluated from scratch for each subsequent bit of information learned. Because of this, it is a poor system to directly construct oblivious protocols, however it is exceptionally useful to build on top of as a base OT seed for extension."}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Correlated OT"}),(0,i.jsxs)("p",{className:"text-justify",children:["Correlated oblivious transfer is a variant of oblivious transfer where instead of sending a singular choice, the choices themselves are implicitly correlated. The traditional ",(0,i.jsx)("a",{href:"https://www.iacr.org/archive/crypto2003/27290145/27290145.pdf",children:"extension approach"})," involves a Random OT base, where the initial choice is random, and then pseudo-random extensions of the random seeds enable larger correlated constructions with many bits being able to be transferred based on the correlation without the cost of doing a singular OT for every bit. This is utilized in many MPC protocols, and further extended in subsequent papers such as ",(0,i.jsx)("a",{href:"https://eprint.iacr.org/2015/546.pdf",children:'"Actively Secure OT Extension with Optimal Overhead"'}),". At the lower level, correlated OT looks like the following:"]}),(0,i.jsxs)("div",{className:"p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']",children:[(0,i.jsx)("div",{children:"Correlated OT (COT):"}),(0,i.jsxs)("ol",{className:"list-decimal pl-6",children:[(0,i.jsxs)("li",{children:["The receiver obtains a ",(0,i.jsxs)("code",{children:["\u2206 \u2208 \ud835\udd3d",(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the sender."]}),(0,i.jsx)("li",{children:"For every extension:"}),(0,i.jsxs)("ol",{className:"list-[lower-alpha] pl-6",children:[(0,i.jsxs)("li",{children:["Sample ",(0,i.jsxs)("code",{children:["v \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),". If the sender is corrupted, instead receive ",(0,i.jsxs)("code",{children:["v \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the adversary."]}),(0,i.jsxs)("li",{children:["Sample ",(0,i.jsxs)("code",{children:["u \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsx)("sub",{children:"2"})]})," and compute ",(0,i.jsxs)("code",{children:["w := v + u \xb7 \u2206 \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),". If the receiver is corrupted, instead receive ",(0,i.jsxs)("code",{children:["u \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsx)("sub",{children:"2"})]})," and ",(0,i.jsxs)("code",{children:["w \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the adversary, and recompute ",(0,i.jsxs)("code",{children:["w := v + u \xb7 \u2206 \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"\u2113"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),"."]})]})]})]}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Correlated OT Extension over LPN"}),(0,i.jsxs)("p",{className:"text-justify",children:["In ",(0,i.jsx)("a",{href:"https://eprint.iacr.org/2020/924.pdf",children:'"Ferret: Fast Extension for Correlated OT with Small Communication"'}),", the authors contributed improvements to this protocol have sufficiently made COT feasible for general computability at speed. In short, the speed improvements are nearly over 200 times faster per correlation. For brevity, we list only the functions relevant to Quilibrium\u2019s instantiation of Ferret, from the article:"]}),(0,i.jsxs)("div",{className:"p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']",children:[(0,i.jsx)("div",{children:"Multi-Point Correlated OT (MPCOT):"}),(0,i.jsxs)("ol",{className:"list-decimal pl-6",children:[(0,i.jsxs)("li",{children:["Given a family of efficiently-computable functions ",(0,i.jsxs)("code",{children:["\u03a6 = ","{","\u03a6",(0,i.jsx)("sub",{children:"n,t"}),"}",(0,i.jsx)("sub",{children:"n,t \u2208 \u2115"})]})," such that for any ",(0,i.jsx)("code",{children:"n,t \u2208 \u2115"})," with ",(0,i.jsxs)("code",{children:["t \u2264 n, \u03a6",(0,i.jsx)("sub",{children:"n,t"})]})," takes as an input a sorted subset of ",(0,i.jsx)("code",{children:"[n]"})," of size ",(0,i.jsx)("code",{children:"t"})," and outputs another subset of ",(0,i.jsx)("code",{children:"[m]"})," with the same size for some integer ",(0,i.jsx)("code",{children:"t \u2264 m \u2264 n."})]}),(0,i.jsxs)("li",{children:["The receiver obtains a ",(0,i.jsxs)("code",{children:["\u2206 \u2208 \ud835\udd3d",(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the sender."]}),(0,i.jsxs)("li",{children:["For extension, the receiver and sender agree to ",(0,i.jsx)("code",{children:"n, t"}),", and the receiver sends ",(0,i.jsxs)("code",{children:["Q = ","{","a",(0,i.jsx)("sub",{children:"0"}),", ..., a",(0,i.jsx)("sub",{children:"t\u22121"}),"}"]})," where ",(0,i.jsx)("code",{children:"Q \u2286 [n]"})," is a sorted set:"]}),(0,i.jsxs)("ol",{className:"list-[lower-alpha] pl-6",children:[(0,i.jsxs)("li",{children:["Sample ",(0,i.jsxs)("code",{children:["v \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),". If the sender is corrupted, instead receive ",(0,i.jsxs)("code",{children:["v \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the adversary."]}),(0,i.jsxs)("li",{children:["Define an ",(0,i.jsx)("code",{children:"n"}),"-sized bit vector ",(0,i.jsx)("code",{children:"u := \ud835\udd74(n, Q)"}),", and compute ",(0,i.jsxs)("code",{children:["w := v + u \xb7 \u2206 \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),".  If the receiver is corrupted, instead receive ",(0,i.jsxs)("code",{children:["u \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsx)("sub",{children:"2"})]})," and ",(0,i.jsxs)("code",{children:["w \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the adversary, and recompute ",(0,i.jsxs)("code",{children:["w := v + u \xb7 \u2206 \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),"."]})]}),(0,i.jsxs)("li",{children:["Compute the set ",(0,i.jsxs)("code",{children:["T = ","{","\u03b2",(0,i.jsx)("sub",{children:"0"}),", ..., \u03b2",(0,i.jsx)("sub",{children:"t\u22121"}),"}"," := \u03a6",(0,i.jsx)("sub",{children:"n,t"}),"(","{","\u03b1",(0,i.jsx)("sub",{children:"0"}),", ..., \u03b1",(0,i.jsx)("sub",{children:"t\u22121"}),"}",")"]}),"."]}),(0,i.jsxs)("li",{children:["Wait for the adversary to input ",(0,i.jsx)("code",{children:"m"})," sets ",(0,i.jsxs)("code",{children:["I",(0,i.jsx)("sub",{children:"0"}),", ..., I",(0,i.jsx)("sub",{children:"m\u22121"})," \u2286 [n] \u222a ","{","\u22121","}"]}),"."]}),(0,i.jsxs)("li",{children:["Check that ",(0,i.jsxs)("code",{children:["\u03b1",(0,i.jsx)("sub",{children:"i"})," \u2208 I",(0,i.jsxs)("sub",{children:["\u03b2",(0,i.jsx)("sub",{children:"i"})]})]})," for all ",(0,i.jsx)("code",{children:"i \u2208 [t]"})," and ",(0,i.jsxs)("code",{children:["\u22121 \u2208 I",(0,i.jsx)("sub",{children:"j"})]})," for all ",(0,i.jsx)("code",{children:"j \u2208 [m] \\ T"}),". If the check fails, the process aborts."]})]}),(0,i.jsx)("div",{className:"pt-6",children:"Deal COT/MPCOT:"}),(0,i.jsxs)("ol",{className:"list-decimal pl-6",children:[(0,i.jsxs)("li",{children:["Given a family of efficiently-computable functions ",(0,i.jsxs)("code",{children:["\u03a6 = ","{","\u03a6",(0,i.jsx)("sub",{children:"n,t"}),"}",(0,i.jsx)("sub",{children:"n,t \u2208 \u2115"})]})," such that for any ",(0,i.jsx)("code",{children:"n,t \u2208 \u2115"})," with ",(0,i.jsxs)("code",{children:["t \u2264 n, \u03a6",(0,i.jsx)("sub",{children:"n,t"})]})," takes as an input a sorted subset of ",(0,i.jsx)("code",{children:"[n]"})," of size ",(0,i.jsx)("code",{children:"t"})," and outputs another subset of ",(0,i.jsx)("code",{children:"[m]"})," with the same size for some integer ",(0,i.jsx)("code",{children:"t \u2264 m \u2264 n."})]}),(0,i.jsxs)("li",{children:["The receiver obtains a ",(0,i.jsxs)("code",{children:["\u2206 \u2208 \ud835\udd3d",(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," from the sender."]}),(0,i.jsxs)("li",{children:["To COT Extend: Call Correlated OT, receive ",(0,i.jsx)("code",{children:"\u2113"})," random COT correlations."]}),(0,i.jsxs)("li",{children:["To MPCOT Extend: Call MPCOT, receive a multi-point COT of length ",(0,i.jsx)("code",{children:"n"}),"."]})]}),(0,i.jsx)("div",{className:"pt-6",children:"Deal COT/MPCOT:"}),(0,i.jsxs)("ol",{className:"list-decimal pl-6",children:[(0,i.jsxs)("li",{children:["Given LPN parameters ",(0,i.jsx)("code",{children:"(n, k, t)"})," and code generator ",(0,i.jsx)("code",{children:"C"})," such that ",(0,i.jsx)("code",{children:"C(k, n, \ud835\udd3d)"})," outputs a matrix ",(0,i.jsxs)("code",{children:["A \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"k\xd7n"}),(0,i.jsx)("sub",{children:"2"})]}),"."]}),(0,i.jsxs)("li",{children:["Both parties initialize once, sender samples a uniform ",(0,i.jsxs)("code",{children:["\u2206 \u2208 \ud835\udd3d",(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," and both parties invoke the Deal initialization step."]}),(0,i.jsxs)("li",{children:["Both parties invoke the COT extend functionality of Deal, returning ",(0,i.jsxs)("code",{children:["v \u2190 \ud835\udd3d",(0,i.jsx)("sup",{children:"k"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," to sender, ",(0,i.jsxs)("code",{children:["(u, w) \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"k"}),(0,i.jsx)("sub",{children:"2"})," \xd7 \ud835\udd3d",(0,i.jsx)("sup",{children:"k"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," to the receiver such that ",(0,i.jsx)("code",{children:"w := v + u \xb7 \u2206"}),"."]}),(0,i.jsx)("li",{children:"To Extend:"}),(0,i.jsxs)("ol",{className:"list-[lower-alpha] pl-6",children:[(0,i.jsxs)("li",{children:["The receiver samples ",(0,i.jsxs)("code",{children:["A \u2190 C(k, n, \ud835\udd3d",(0,i.jsx)("sub",{children:"2"}),")"]})," and ",(0,i.jsxs)("code",{children:["e \u2190 HW",(0,i.jsx)("sub",{children:"t"})]}),", then sends ",(0,i.jsx)("code",{children:"A"})," to the sender. Let ",(0,i.jsxs)("code",{children:["Q = ","{","a",(0,i.jsx)("sub",{children:"0"}),", ..., a",(0,i.jsx)("sub",{children:"t\u22121"}),"}"," \u2286 [n]"]})," be the sorted indices of non-zero entries in ",(0,i.jsx)("code",{children:"e"}),"."]}),(0,i.jsxs)("li",{children:["The sender and receiver invokes the Deal MPCOT functionality, returning ",(0,i.jsxs)("code",{children:["s \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," to the sender and ",(0,i.jsxs)("code",{children:["r \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," to the receiver, where ",(0,i.jsx)("code",{children:"r + s = e \xb7 \u2206"}),". If either party aborts, this protocol aborts."]}),(0,i.jsxs)("li",{children:["The sender computes ",(0,i.jsxs)("code",{children:["y := v \xb7 A + s \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," and the receiver computes ",(0,i.jsxs)("code",{children:["x := u \xb7 A + e \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsx)("sub",{children:"2"})]})," and ",(0,i.jsxs)("code",{children:["z := w \xb7 A + r \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"n"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),"."]}),(0,i.jsxs)("li",{children:["The sender updates vector ",(0,i.jsxs)("code",{children:["v := y[0 : k] \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"k"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),", and outputs a vector ",(0,i.jsxs)("code",{children:["y\u2032 := y[k : n] \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"l"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),". The receiver updates vectors ",(0,i.jsxs)("code",{children:["(u, w) := (x[0 : k], z[0 : k]) \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"k"}),(0,i.jsx)("sub",{children:"2"})," \xd7 \ud835\udd3d",(0,i.jsx)("sup",{children:"k"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]})," and outputs two vectors ",(0,i.jsxs)("code",{children:["(x\u2032, z\u2032) := (x[k : n], z[k : n]) \u2208 \ud835\udd3d",(0,i.jsx)("sup",{children:"l"}),(0,i.jsx)("sub",{children:"2"})," \xd7 \ud835\udd3d",(0,i.jsx)("sup",{children:"l"}),(0,i.jsxs)("sub",{children:["2",(0,i.jsx)("sup",{children:"\u03ba"})]})]}),"."]})]})]})]})]})}),l={sidebar_position:2},d="Oblivious Transfer",t={id:"learn/oblivious-hypergraph/oblivious-transfer",title:"Oblivious Transfer",description:"",source:"@site/docs/learn/oblivious-hypergraph/oblivious-transfer.md",sourceDirName:"learn/oblivious-hypergraph",slug:"/learn/oblivious-hypergraph/oblivious-transfer",permalink:"/docs/learn/oblivious-hypergraph/oblivious-transfer",draft:!1,unlisted:!1,editUrl:"https://github.com/QuilibriumNetwork/docs/tree/main/docs/learn/oblivious-hypergraph/oblivious-transfer.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"learn",previous:{title:"Hypergraph Construction",permalink:"/docs/learn/oblivious-hypergraph/hypergraph-construction"},next:{title:"RDF Storage",permalink:"/docs/learn/oblivious-hypergraph/rdf-storage"}},o={},h=[];function a(e){const s={h1:"h1",header:"header",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"oblivious-transfer",children:"Oblivious Transfer"})}),"\n",(0,i.jsx)(c,{})]})}function x(e={}){const{wrapper:s}={...(0,n.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,s,r)=>{r.d(s,{R:()=>l,x:()=>d});var i=r(6540);const n={},c=i.createContext(n);function l(e){const s=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function d(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),i.createElement(c.Provider,{value:s},e.children)}}}]);