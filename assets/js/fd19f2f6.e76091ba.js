"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[399],{5878:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>h,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var i=s(4848),n=s(8453),a=(s(6540),s(7293));const r=()=>(0,i.jsx)("div",{className:"learn-page text-left flex md:flex-row flex-col text-slate",children:(0,i.jsxs)("div",{className:"flex-1",children:[(0,i.jsx)("p",{className:"pb-10 text-justify",children:"End-to-End Encryption (E2EE) is a critical component in ensuring communication between nodes is secured, but E2EE can mean many things. For the purpose of Quilibrium, we employ an E2EE scheme that retains forward and future secrecy properties, called Triple-Ratchet."}),(0,i.jsx)("h2",{className:"text-xl pb-4 font-medium",children:"Basics"}),(0,i.jsx)("p",{className:"text-justify",children:'E2EE, simply stated, is an encryption scheme that ensures the individual parties in communication with one another are the only individuals that can ever see the plaintext. When thinking about what constitutes E2EE, it\'s important to think of "parties" as not just people, but systems. Thus, if a conversation between Alice and Bob is E2EE, no systems or intermediaries that facilitate that conversation have the ability to read their messages. There are many approaches to E2EE, with tradeoffs to performance, security and secrecy.'}),(0,i.jsx)("p",{className:"py-4 text-justify",children:"In terms of some of those tradeoffs, we want to have the following properties:"}),(0,i.jsxs)("ul",{className:"text-justify",children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"Forward Secrecy"})," \u2013 that if a key used in the encryption of a conversation is obtained by an attacker, previous messages are still not decryptable by the attacker."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"Post-Compromise Secrecy"})," \u2013 that if a key used in the encryption of a conversation is obtained by an attacker, messages created after the compromise has been ended are still not decryptable by the attacker."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"Repudiability"})," \u2013 that the algorithmic approach to securing the conversation is done such that once messages have been sent/received, it is impossible to know from the data after the event that they truly were originated by the author, granting the author plausible deniability to any message that they have written."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"Replay Protection"})," \u2013 that messages that are re-sent do not result in duplicate messages or potential confusion of the current state of keys used to secure the system."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"Out-of-Order Messaging"})," \u2013 that networks/systems may reorder messages, but the recipients will still be able to produce the correct sequence as intended by the author, and tolerate those incorrect sequences without losing security."]})]}),(0,i.jsx)("p",{className:"pt-4 pb-10 text-justify",children:"To start constructing an approach, let's consider a few tools we can utilize."}),(0,i.jsx)("h2",{className:"text-xl pb-4 font-medium",children:"ECDH"}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"Elliptic Curve Diffie-Hellman (ECDH) is a key agreement protocol in which two parties exchange elliptic public keys (P and Q), and using the commutative properties of scalar multiplication of elliptic curve points,"}),(0,i.jsxs)("p",{className:"text-center text-xl pb-4",children:[(0,i.jsx)("span",{className:"text-pink-400",children:"p"})," * ",(0,i.jsx)("span",{className:"text-green-600",children:"Q"})," = ",(0,i.jsx)("span",{className:"text-pink-400",children:"p"})," * ",(0,i.jsx)("span",{className:"text-green-600",children:"q"})," * G = ",(0,i.jsx)("span",{className:"text-green-600",children:"q"})," * ",(0,i.jsx)("span",{className:"text-pink-400",children:"p"})," * G = ",(0,i.jsx)("span",{className:"text-green-600",children:"q"})," * ",(0,i.jsx)("span",{className:"text-pink-400",children:"P"})]}),(0,i.jsx)("p",{className:"text-justify",children:"and thus both parties can agree to a shared value others cannot deduce, as others do not possess either parties' private key scalar. Let's walk through a protocol that uses only ECDH and assess what properties it provides:"}),(0,i.jsx)("p",{className:"py-4 text-center",children:(0,i.jsx)("img",{className:"xl:max-w-xl lg:max-w-lg sm:max-w-full inline-block rounded-xl drop-shadow-xl",src:"/img/docs/learn/communication/SimpleECDH.png"})}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"In this simple example both parties agree to a singular symmetric key via ECDH. Let's revisit our desired properties \u2013 does this approach have these?"}),(0,i.jsxs)("ul",{className:"pb-4 text-justify",children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\ud83d\udeab Forward Secrecy"})," \u2013 Since there is only one key, if compromised, all previous messages are decryptable."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\ud83d\udeab Post-Compromise Secrecy"})," \u2013 Likewise, all future messages are also decryptable."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\u2705 Repudiability"})," \u2013 Because there is only one key that both parties have access to, only the sender and receiver can know who truly originated the message, or if it was even authentically their own."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\ud83d\udeab Replay Protection"})," \u2013 This approach does not prevent replays, as the message content sent is indistinguishable from an intentional duplicate."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\ud83d\udeab Out-of-Order Messaging"})," \u2013 This approach does not prevent out-of-order messaging, as there is no way to algorithmically distinguish whether one message precedes the other."]})]}),(0,i.jsx)(a.A,{type:"danger",children:(0,i.jsx)("p",{children:"There is also one other element to consider \u2013 interdiction. If an attacker were to insert them in the middle of this channel and pairwise establish ECDH with each side, they could pretend to be the other party, or silently pass messages while being able to read them. There is a way to prevent this by deriving a value from the agreed key and allowing both sides to confirm out of band, but this will vary by approach and so for now, we omit this consideration beyond noting its existence."})}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"ECDH Ratcheting"}),(0,i.jsx)("p",{className:"py-4 text-justify",children:"Let's augment this with an intermediate step: every time the first message is received from the other party after having sent our own messages, create a new public key, and perform ECDH with their public key. When sending a message back, include our new public key so they can decrypt. On their turn of first receipt, they will also create a new public key for their next send, thus ratcheting both sides over alternating intervals. What does this net us?"}),(0,i.jsxs)("ul",{className:"pb-4 text-justify",children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\u2705 Forward Secrecy"})," \u2013 Since there is a new key every alternating round, if a key is compromised, previous messages are not decryptable."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\u2705 Post-Compromise Secrecy"})," \u2013 Likewise, future messages post ratchet are also not decryptable."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\u2705 Repudiability"})," \u2013 Because both parties have access to the same symmetric keys, only the sender and receiver can know who truly originated the message."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\ud83d\udeab Replay Protection"})," \u2013 This approach does not prevent replays, as the message content sent is still indistinguishable from an intentional duplicate."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("b",{children:"\ud83d\udeab Out-of-Order Messaging"})," \u2013 This approach slightly prevents out-of-order messaging, in that we can ensure sender and receiver ordering is correct, but not within the scope of a sender or receiver."]})]}),(0,i.jsx)("p",{className:"text-justify",children:"So we're almost there. How can we gain those last two properties?"}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"KDF Ratcheting"}),(0,i.jsx)("p",{className:"text-justify",children:"The KDF ratchet employs the use of a hash-based message authentication code (HMAC). A common HMAC in this scenario is HMAC-SHA256. As a function, you can consider HMAC defined generally as"}),(0,i.jsx)("p",{className:"text-center text-xl py-4",children:(0,i.jsx)("code",{children:"HMAC(K, m) = H((K' xor opad) || H((K' xor ipad) || m)"})}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"To break this down into what this means and why, let\u2019s first label the pieces."}),(0,i.jsxs)("ul",{className:"pb-4",children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"H(x)"})," \u2013 a hash function."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"K"})," \u2013 the secret key."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"m"})," \u2013 the message."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"opad"})," \u2013 the outer padding, consisting of the byte ",(0,i.jsx)("code",{children:"0x5C"})," repeated for the byte length of the block."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"ipad"})," \u2013 the inner padding, consisting of the byte ",(0,i.jsx)("code",{children:"0x36"})," repeated for the byte length of the block."]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("code",{children:"K'"})," \u2013 a derivation of ",(0,i.jsx)("code",{children:"K"}),", where when smaller than the block size is padded to the right with zeroes to the byte length of the block, or hashed with ",(0,i.jsx)("code",{children:"H"})," to either less than or equal to the block size and padded to the right with zeroes if shorter."]})]}),(0,i.jsxs)("p",{className:"pb-4 text-justify",children:["This produces an output sized to the hash function. HMAC, in conjunction with an expansion function, creates a secure KDF with definable length. We can describe this function as ",(0,i.jsx)("code",{children:"HKDF(salt, K, m, L)"}),". The two additional elements here are ",(0,i.jsx)("code",{children:"salt"}),", a non-secret random value or a byte string of zeroes to the length of the hash function, and ",(0,i.jsx)("code",{children:"L"}),", the length of the KDF output in bytes. The process for the HKDF has two phases: an extract phase, which is just the invocation of the HMAC as ",(0,i.jsx)("code",{children:"HMAC(salt, K)"})," (note the order), and using that value as a pseudo-random key ",(0,i.jsx)("code",{children:"PRK"})," in the expand phase, which can be expressed in the following pseudocode:"]}),(0,i.jsxs)("div",{className:"p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl",children:[(0,i.jsx)("code",{className:"block",children:"int hl = <length_of_hash_function_in_bytes>"}),(0,i.jsx)("code",{className:"block",children:"int n = (L / hl) + (L % hl > 0 ? 1 : 0)"}),(0,i.jsx)("code",{className:"block",children:'string t = ""'}),(0,i.jsx)("code",{className:"block",children:"\xa0"}),(0,i.jsxs)("code",{className:"block",children:["for (byte i = 0x01; i <= n; i++) ","{"]}),(0,i.jsx)("code",{className:"block",children:"\xa0\xa0\xa0\xa0// assume + is a concatenation operator here:"}),(0,i.jsx)("code",{className:"block",children:"\xa0\xa0\xa0\xa0t = HMAC(PRK, t + m + i)"}),(0,i.jsx)("code",{className:"block",children:"}"}),(0,i.jsx)("code",{className:"block",children:"\xa0"}),(0,i.jsx)("code",{className:"block",children:"return t[0..n]"})]}),(0,i.jsxs)("p",{className:"py-4 text-justify",children:["We can now take this KDF and chain it with itself, using the output length in bytes to produce a block that can be split into constituent pieces as needed, at a minimum the same length as the input key, to be fed back into the KDF. This will get used in conjunction with the Diffie-Hellman Ratchet to produce the ",(0,i.jsx)("a",{href:"http://signal.org/docs/specifications/doubleratchet/#ref-rfc5869",children:"Double-Ratchet algorithm"}),". Because the iterations of KDF ratcheting produces a deterministic key sequence, we have now obtained guaranteed uniqueness for messages (replay protection) and message ordering (no out-of-order messages). This provides a highly-secure two-party E2EE scheme, but how do we handle groups of any count?"]}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Triple-Ratchet"}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"The Triple-Ratchet protocol is an extension to the Double-Ratchet protocol, utilizing an asynchronous DKG ratchet (or synchronous DKG ratchet in a fully-online model, not applicable here) to provide a \u201croom key\u201d as the counterparty receiver key plugged into the Double-Ratchet algorithm\u2019s Diffie-Hellman process. This DKG ratchet can be broken down into three rounds:"}),(0,i.jsxs)("ol",{className:"pb-4 pl-6 list-decimal",children:[(0,i.jsx)("li",{children:"Polynomial Sampling"}),(0,i.jsx)("li",{children:"Point Calculation, Proof Construction and Commitment Distribution"}),(0,i.jsx)("li",{children:"Point and Proof Distribution, Reconstruction"})]}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Polynomial Sampling"}),(0,i.jsx)("p",{className:"text-justify",children:"Shamir\u2019s Secret Sharing is a technique for encoding a secret in the form of a constant of a randomly sampled polynomial, then distributing evaluations of that polynomial to each participant such that the threshold number of participants in the scheme could perform Lagrange interpolation to reproduce the constant:"}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"Given a threshold of three participants, construct a $t-1$ degree polynomial, randomly sampling coefficients ($A, B$) from the finite field, setting the constant $C$ as the secret:"}),(0,i.jsxs)("p",{className:"text-center text-xl py-4",children:["f(x) = Ax",(0,i.jsx)("sup",{children:"2"}),"+Bx+C"]}),(0,i.jsxs)("p",{className:"pb-4 text-justify",children:["The dealer of these secret shares then evaluates the polynomial where ",(0,i.jsx)("code",{children:"x"})," is the identifier of the participant (notably, ",(0,i.jsx)("code",{children:"x"})," cannot equal zero as it would simply be handing the participant the secret, and likewise, ",(0,i.jsx)("code",{children:"x"})," cannot be the order of the group either, as ",(0,i.jsx)("code",{children:"x mod q = 0"})," where ",(0,i.jsx)("code",{children:"x = q"}),"."]}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"The dealer distributes these samples to each participant, and when recombining, the participants calculate:"}),(0,i.jsxs)("p",{className:"text-center flex flex-row justify-center text-xl pb-4",children:[(0,i.jsx)("div",{className:"flex flex-col justify-center",children:"C = f(0) = "}),(0,i.jsx)("div",{className:"inline-block pt-4",children:(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("div",{className:"text-sm",children:"t-1"}),(0,i.jsx)("div",{className:"text-4xl",children:"\u03a3"}),(0,i.jsx)("div",{className:"text-sm",children:"j=0"})]})}),(0,i.jsx)("div",{className:"flex flex-col justify-center pl-2",children:(0,i.jsxs)("div",{children:["y",(0,i.jsx)("sub",{children:"j"})]})}),(0,i.jsx)("div",{className:"inline-block pt-4",children:(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("div",{className:"text-sm",children:"t-1"}),(0,i.jsx)("div",{className:"text-4xl",children:"\u03a0"}),(0,i.jsxs)("div",{className:"text-xs",children:[(0,i.jsx)("div",{children:"(m=0)"}),(0,i.jsx)("div",{children:"m!=j"})]})]})}),(0,i.jsx)("div",{className:"inline-block pt-6",children:(0,i.jsxs)("div",{className:"flex flex-col border border-x-2 rounded-lg border-y-0 border-white px-2 ml-2",children:[(0,i.jsxs)("div",{className:"border border-0 border-b-2 pb-1 border-white",children:["x",(0,i.jsx)("sub",{children:"m"})]}),(0,i.jsxs)("div",{children:["x",(0,i.jsx)("sub",{children:"m"})," - x",(0,i.jsx)("sub",{children:"j"})]})]})})]}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"Shamir Secret Sharing's downside is, used directly, it only works with a known secret value, which would mean one party would have to be trusted. Thus, we have to augment this approach such that we can verify the shares are valid for all parties, and that no one party has to be trusted. To solve the first problem, Feldman Verifiable Secret Sharing (FVSS) brings the same premise, but with a verifiable proof."}),(0,i.jsx)("p",{className:"text-justify",children:"Solving the second problem, the need for a trusted dealer, simply have all parties perform FVSS and distribute polynomial samples, then calculate your local share by adding your received samples to your secret."}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Point Calculation, Proof Construction and Commitment Distribution"}),(0,i.jsxs)("p",{className:"pb-4 text-justify",children:["Following the group polynomial sampling, once all parties have received their samples and added them to their secret values, to calculate the verifiable aspect of FVSS, take the local secret as a scalar to the generator of the curve ",(0,i.jsx)("code",{children:"s * G = P"}),"."]}),(0,i.jsxs)("p",{className:"pb-4 text-justify",children:["Before distributing ",(0,i.jsx)("code",{children:"P"})," to everyone, we instead calculate a zero knowledge proof that we possess the scalar corresponding to P, then present a commitment to that proof:"]}),(0,i.jsxs)("ol",{className:"list-decimal pl-6 text-justify",children:[(0,i.jsxs)("li",{children:["Generate a new random scalar, ",(0,i.jsxs)("code",{children:["r",(0,i.jsx)("sub",{children:"i"})]}),", and its corresponding public point ",(0,i.jsxs)("code",{children:["R",(0,i.jsx)("sub",{children:"i"})," = r",(0,i.jsx)("sub",{children:"i"})," * G"]}),", matching the same curve parameters as the mutually agreed key."]}),(0,i.jsxs)("li",{children:["To make this process non-interactive, we will apply the Fiat-Shamir heuristic by hashing the serialized threshold sharing\u2019s public key concatenated with the random public point: ",(0,i.jsxs)("code",{children:["ch",(0,i.jsx)("sub",{children:"i"})," = H(P",(0,i.jsx)("sub",{children:"i"}),"||R",(0,i.jsx)("sub",{children:"i"}),")"]})]}),(0,i.jsxs)("li",{children:["To calculate the ZKPoK, we take the threshold secret, multiply it against the integer representation of the challenge, and add the random scalar: ",(0,i.jsxs)("code",{children:["z",(0,i.jsx)("sub",{children:"i"})," = s",(0,i.jsx)("sub",{children:"i"})," * ch",(0,i.jsx)("sub",{children:"i"})," + r",(0,i.jsx)("sub",{children:"i"})]})]}),(0,i.jsxs)("li",{children:["We finally commit to this ZKPoK by taking the hash of the serialized random public point concatenated with the ZKPoK: ",(0,i.jsxs)("code",{children:["c",(0,i.jsx)("sub",{children:"i"})," = H(R",(0,i.jsx)("sub",{children:"i"}),"||z",(0,i.jsx)("sub",{children:"i"}),")"]})]}),(0,i.jsx)("li",{children:"This commitment is to be broadcast ahead of the sharing of the public points."})]}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"Point and Proof Distribution, Reconstruction"}),(0,i.jsxs)("p",{className:"pb-4 text-justify",children:["Once all parties have broadcasted their commitments, distribute ",(0,i.jsxs)("code",{children:["P",(0,i.jsx)("sub",{children:"i"})]}),", ",(0,i.jsxs)("code",{children:["z",(0,i.jsx)("sub",{children:"i"})]}),", and ",(0,i.jsxs)("code",{children:["R",(0,i.jsx)("sub",{children:"i"})]}),". With these values, verify:"]}),(0,i.jsxs)("ol",{className:"list-decimal pl-6 text-justify",children:[(0,i.jsxs)("li",{children:["Reproduce the challenge by hashing the concatenation of the serialized threshold sharing\u2019s public key with the random public point: ",(0,i.jsxs)("code",{children:["ch",(0,i.jsx)("sub",{children:"j"})," = H(P",(0,i.jsx)("sub",{children:"j"}),"||R",(0,i.jsx)("sub",{children:"j"}),")"]})]}),(0,i.jsxs)("li",{children:["Multiply the challenge scalar against the threshold sharing public key, then add the random public point to this point, which should equal the scalar multiplication of the ZKPoK against the generator of the curve: ",(0,i.jsxs)("code",{children:["Z",(0,i.jsx)("sub",{children:"j"})," = ch",(0,i.jsx)("sub",{children:"j"})," * PK",(0,i.jsx)("sub",{children:"j"})," + R",(0,i.jsx)("sub",{children:"j"})]})]}),(0,i.jsxs)("li",{children:["Multiply the ZKPoK against the generator of the curve and confirm this value equals the previously calculated value, and abort if this does not match: ",(0,i.jsxs)("code",{children:["z",(0,i.jsx)("sub",{children:"j"})," * G = Z",(0,i.jsx)("sub",{children:"j"})]})]}),(0,i.jsxs)("li",{children:["Take the hash of the serialized random public point concatenated with the ZKPoK, and confirm this matches the commitment, and abort if this does not match: ",(0,i.jsxs)("code",{children:["c",(0,i.jsx)("sub",{children:"j"})," = H(R",(0,i.jsx)("sub",{children:"j"}),"||z",(0,i.jsx)("sub",{children:"j"}),")"]})]}),(0,i.jsx)("li",{children:"If the values matched, verification has succeeded."})]}),(0,i.jsxs)("p",{className:"py-4 text-justify",children:["Finally, all participants may do Lagrange interpolation of the polynomial with the public values of the shares (Shamir in the Exponent), iterating through all participants. The resulting output, provided no party cheated, will equal ",(0,i.jsx)("code",{children:"P"})," for all combinations of threshold participants. If someone did cheat, some or all of the combinations will not equal ",(0,i.jsx)("code",{children:"P"}),"."]}),(0,i.jsx)("h2",{className:"text-xl pt-10 pb-4 font-medium",children:"ADKG Ratchet"}),(0,i.jsx)("p",{className:"pb-4 text-justify",children:"Now that we have a means to ensure no party can produce invalid fragments, we can adopt a new ratcheting scheme for DKG. Each party will (upon their need to ratchet):"}),(0,i.jsxs)("ol",{className:"list-decimal pl-6 text-justify",children:[(0,i.jsx)("li",{children:"Individually perform a local FVSS with PVS, and enqueue the output bundles to the respective recipients."}),(0,i.jsxs)("li",{children:["When a new bundle is needed from a given party, the other participants will dequeue the bundle, and perform the verification process of PVS. Upon confirmation of verification, each party will recalculate the new shared polynomial, substituting the old fragment with the new to obtain a new ",(0,i.jsxs)("code",{children:["s",(0,i.jsx)("sub",{children:"i"})]}),", and each party will send their public point ",(0,i.jsxs)("code",{children:["P",(0,i.jsx)("sub",{children:"i"})]}),"."]}),(0,i.jsx)("li",{children:"Each party then performs FVSS\u2019 Shamir-in-the-Exponent recombination of the public points."})]}),(0,i.jsx)("p",{className:"py-4 text-justify",children:"To perform Diffie-Hellman over this distributed key, swap the generator point with the other party's public key and perform the above DKG process. To visually summarize, here is an example of the entire Triple-Ratchet algorithm exchange, in a 3-of-4 threshold configuration:"}),(0,i.jsx)("p",{className:"",children:(0,i.jsx)("img",{src:"/img/docs/learn/communication/TripleRatchet.png"})})]})}),o={sidebar_position:2},c="E2EE",l={id:"learn/communication/e2ee",title:"E2EE",description:"",source:"@site/docs/learn/communication/e2ee.md",sourceDirName:"learn/communication",slug:"/learn/communication/e2ee",permalink:"/docs/learn/communication/e2ee",draft:!1,unlisted:!1,editUrl:"https://github.com/QuilibriumNetwork/docs/tree/main/docs/learn/communication/e2ee.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"learn",previous:{title:"Addressing",permalink:"/docs/learn/communication/addressing"},next:{title:"Mixnet Routing",permalink:"/docs/learn/communication/mixnet-routing"}},h={},d=[];function p(e){const t={h1:"h1",header:"header",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"e2ee",children:"E2EE"})}),"\n",(0,i.jsx)(r,{})]})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},7293:(e,t,s)=>{s.d(t,{A:()=>S});var i=s(6540),n=s(4848);function a(e){const{mdxAdmonitionTitle:t,rest:s}=function(e){const t=i.Children.toArray(e),s=t.find((e=>i.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),a=t.filter((e=>e!==s)),r=s?.props.children;return{mdxAdmonitionTitle:r,rest:a.length>0?(0,n.jsx)(n.Fragment,{children:a}):null}}(e.children),a=e.title??t;return{...e,...a&&{title:a},children:s}}var r=s(4164),o=s(1312),c=s(7559);const l="admonition_xJq3",h="admonitionHeading_Gvgb",d="admonitionIcon_Rf37",p="admonitionContent_BuS1";function u(e){let{type:t,className:s,children:i}=e;return(0,n.jsx)("div",{className:(0,r.A)(c.G.common.admonition,c.G.common.admonitionType(t),l,s),children:i})}function m(e){let{icon:t,title:s}=e;return(0,n.jsxs)("div",{className:h,children:[(0,n.jsx)("span",{className:d,children:t}),s]})}function x(e){let{children:t}=e;return t?(0,n.jsx)("div",{className:p,children:t}):null}function j(e){const{type:t,icon:s,title:i,children:a,className:r}=e;return(0,n.jsxs)(u,{type:t,className:r,children:[i||s?(0,n.jsx)(m,{title:i,icon:s}):null,(0,n.jsx)(x,{children:a})]})}function f(e){return(0,n.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const b={icon:(0,n.jsx)(f,{}),title:(0,n.jsx)(o.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function y(e){return(0,n.jsx)(j,{...b,...e,className:(0,r.A)("alert alert--secondary",e.className),children:e.children})}function g(e){return(0,n.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const v={icon:(0,n.jsx)(g,{}),title:(0,n.jsx)(o.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function w(e){return(0,n.jsx)(j,{...v,...e,className:(0,r.A)("alert alert--success",e.className),children:e.children})}function N(e){return(0,n.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const k={icon:(0,n.jsx)(N,{}),title:(0,n.jsx)(o.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function E(e){return(0,n.jsx)(j,{...k,...e,className:(0,r.A)("alert alert--info",e.className),children:e.children})}function T(e){return(0,n.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const C={icon:(0,n.jsx)(T,{}),title:(0,n.jsx)(o.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function H(e){return(0,n.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const P={icon:(0,n.jsx)(H,{}),title:(0,n.jsx)(o.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const R={icon:(0,n.jsx)(T,{}),title:(0,n.jsx)(o.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const K={...{note:y,tip:w,info:E,warning:function(e){return(0,n.jsx)(j,{...C,...e,className:(0,r.A)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,n.jsx)(j,{...P,...e,className:(0,r.A)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,n.jsx)(y,{title:"secondary",...e}),important:e=>(0,n.jsx)(E,{title:"important",...e}),success:e=>(0,n.jsx)(w,{title:"success",...e}),caution:function(e){return(0,n.jsx)(j,{...R,...e,className:(0,r.A)("alert alert--warning",e.className),children:e.children})}}};function S(e){const t=a(e),s=(i=t.type,K[i]||(console.warn(`No admonition component found for admonition type "${i}". Using Info as fallback.`),K.info));var i;return(0,n.jsx)(s,{...t})}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>o});var i=s(6540);const n={},a=i.createContext(n);function r(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);