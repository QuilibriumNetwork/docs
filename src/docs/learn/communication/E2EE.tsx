import React from 'react';
import Admonition from '@theme/Admonition';

const E2EE = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-10 text-justify">End-to-End Encryption (E2EE) is a critical component in ensuring communication between nodes is secured, but E2EE can mean many things. For the purpose of Quilibrium, we employ an E2EE scheme that retains forward and future secrecy properties, called Triple-Ratchet.</p>
      <h2 className="text-xl pb-4 font-medium">Basics</h2>
      <p className="text-justify">
        E2EE, simply stated, is an encryption scheme that ensures the individual parties in communication with one another are the only individuals that can ever see the plaintext. When thinking about what constitutes E2EE, it's important to think of "parties" as not just people, but systems. Thus, if a conversation between Alice and Bob is E2EE, no systems or intermediaries that facilitate that conversation have the ability to read their messages. There are many approaches to E2EE, with tradeoffs to performance, security and secrecy.
      </p>
      <p className="py-4 text-justify">
        In terms of some of those tradeoffs, we want to have the following properties:
      </p>
      <ul className="text-justify">
        <li><b>Forward Secrecy</b> – that if a key used in the encryption of a conversation is obtained by an attacker, previous messages are still not decryptable by the attacker.</li>
        <li><b>Post-Compromise Secrecy</b> – that if a key used in the encryption of a conversation is obtained by an attacker, messages created after the compromise has been ended are still not decryptable by the attacker.</li>
        <li><b>Repudiability</b> – that the algorithmic approach to securing the conversation is done such that once messages have been sent/received, it is impossible to know from the data after the event that they truly were originated by the author, granting the author plausible deniability to any message that they have written.</li>
        <li><b>Replay Protection</b> – that messages that are re-sent do not result in duplicate messages or potential confusion of the current state of keys used to secure the system.</li>
        <li><b>Out-of-Order Messaging</b> – that networks/systems may reorder messages, but the recipients will still be able to produce the correct sequence as intended by the author, and tolerate those incorrect sequences without losing security.</li>
      </ul>
      <p className="pt-4 pb-10 text-justify">
        To start constructing an approach, let's consider a few tools we can utilize.
      </p>
      <h2 className="text-xl pb-4 font-medium">ECDH</h2>
      <p className="pb-4 text-justify">
        Elliptic Curve Diffie-Hellman (ECDH) is a key agreement protocol in which two parties exchange elliptic public keys (P and Q), and using the commutative properties of scalar multiplication of elliptic curve points,
      </p>
      <p className="text-center text-xl pb-4"><span className="text-pink-400">p</span> * <span className="text-green-600">Q</span> = <span className="text-pink-400">p</span> * <span className="text-green-600">q</span> * G = <span className="text-green-600">q</span> * <span className="text-pink-400">p</span> * G = <span className="text-green-600">q</span> * <span className="text-pink-400">P</span></p>
      <p className="text-justify">
        and thus both parties can agree to a shared value others cannot deduce, as others do not possess either parties' private key scalar. Let's walk through a protocol that uses only ECDH and assess what properties it provides:
      </p>
      <p className="py-4 text-center">
        <img className="xl:max-w-xl lg:max-w-lg sm:max-w-full inline-block rounded-xl drop-shadow-xl" src={"/img/docs/learn/communication/SimpleECDH.png"}/>
      </p>
      <p className="pb-4 text-justify">
        In this simple example both parties agree to a singular symmetric key via ECDH. Let's revisit our desired properties – does this approach have these?
      </p>
      <ul className="pb-4 text-justify">
        <li><b>🚫 Forward Secrecy</b> – Since there is only one key, if compromised, all previous messages are decryptable.</li>
        <li><b>🚫 Post-Compromise Secrecy</b> – Likewise, all future messages are also decryptable.</li>
        <li><b>✅ Repudiability</b> – Because there is only one key that both parties have access to, only the sender and receiver can know who truly originated the message, or if it was even authentically their own.</li>
        <li><b>🚫 Replay Protection</b> – This approach does not prevent replays, as the message content sent is indistinguishable from an intentional duplicate.</li>
        <li><b>🚫 Out-of-Order Messaging</b> – This approach does not prevent out-of-order messaging, as there is no way to algorithmically distinguish whether one message precedes the other.</li>
      </ul>
      <Admonition type="danger">
        <p>
          There is also one other element to consider – interdiction. 
          If an attacker were to insert them in the middle of this channel and pairwise establish ECDH with each side, they could pretend to be the other party, or silently pass messages while being able to read them. There is a way to prevent this by deriving a value from the agreed key and allowing both sides to confirm out of band, but this will vary by approach and so for now, we omit this consideration beyond noting its existence.
        </p>
      </Admonition>
      <h2 className="text-xl pt-10 pb-4 font-medium">ECDH Ratcheting</h2>
      <p className="py-4 text-justify">
        Let's augment this with an intermediate step: every time the first message is received from the other party after having sent our own messages, create a new public key, and perform ECDH with their public key. When sending a message back, include our new public key so they can decrypt. On their turn of first receipt, they will also create a new public key for their next send, thus ratcheting both sides over alternating intervals. What does this net us?
      </p>
      <ul className="pb-4 text-justify">
        <li><b>✅ Forward Secrecy</b> – Since there is a new key every alternating round, if a key is compromised, previous messages are not decryptable.</li>
        <li><b>✅ Post-Compromise Secrecy</b> – Likewise, future messages post ratchet are also not decryptable.</li>
        <li><b>✅ Repudiability</b> – Because both parties have access to the same symmetric keys, only the sender and receiver can know who truly originated the message.</li>
        <li><b>🚫 Replay Protection</b> – This approach does not prevent replays, as the message content sent is still indistinguishable from an intentional duplicate.</li>
        <li><b>🚫 Out-of-Order Messaging</b> – This approach slightly prevents out-of-order messaging, in that we can ensure sender and receiver ordering is correct, but not within the scope of a sender or receiver.</li>
      </ul>
      <p className="text-justify">
        So we're almost there. How can we gain those last two properties?
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">KDF Ratcheting</h2>
      <p className="text-justify">
        The KDF ratchet employs the use of a hash-based message authentication code (HMAC). A common HMAC in this scenario is HMAC-SHA256. As a function, you can consider HMAC defined generally as
      </p>
      <p className="text-center text-xl py-4">
        <code>HMAC(K, m) = H((K' xor opad) || H((K' xor ipad) || m)</code>
      </p>
      <p className="pb-4 text-justify">To break this down into what this means and why, let’s first label the pieces.</p>
      <ul className="pb-4">
        <li><code>H(x)</code> – a hash function.</li>
        <li><code>K</code> – the secret key.</li>
        <li><code>m</code> – the message.</li>
        <li><code>opad</code> – the outer padding, consisting of the byte <code>0x5C</code> repeated for the byte length of the block.</li>
        <li><code>ipad</code> – the inner padding, consisting of the byte <code>0x36</code> repeated for the byte length of the block.</li>
        <li><code>K'</code> – a derivation of <code>K</code>, where when smaller than the block size is padded to the right with zeroes to the byte length of the block, or hashed with <code>H</code> to either less than or equal to the block size and padded to the right with zeroes if shorter.</li>
      </ul>
      <p className="pb-4 text-justify">This produces an output sized to the hash function. HMAC, in conjunction with an expansion function, creates a secure KDF with definable length. We can describe this function as <code>HKDF(salt, K, m, L)</code>. The two additional elements here are <code>salt</code>, a non-secret random value or a byte string of zeroes to the length of the hash function, and <code>L</code>, the length of the KDF output in bytes. The process for the HKDF has two phases: an extract phase, which is just the invocation of the HMAC as <code>HMAC(salt, K)</code> (note the order), and using that value as a pseudo-random key <code>PRK</code> in the expand phase, which can be expressed in the following pseudocode:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl">
        <code className="block">int hl = &lt;length_of_hash_function_in_bytes&gt;</code>
        <code className="block">int n = (L / hl) + (L % hl &gt; 0 ? 1 : 0)</code>
        <code className="block">string t = ""</code>
        <code className="block">&nbsp;</code>
        <code className="block">for (byte i = 0x01; i &lt;= n; i++) {"{"}</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;// assume + is a concatenation operator here:</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;t = HMAC(PRK, t + m + i)</code>
        <code className="block">{"}"}</code>
        <code className="block">&nbsp;</code>
        <code className="block">return t[0..n]</code>
      </div>
      <p className="py-4 text-justify">
        We can now take this KDF and chain it with itself, using the output length in bytes to produce a block that can be split into constituent pieces as needed, at a minimum the same length as the input key, to be fed back into the KDF. This will get used in conjunction with the Diffie-Hellman Ratchet to produce the <a href="http://signal.org/docs/specifications/doubleratchet/#ref-rfc5869">Double-Ratchet algorithm</a>. Because the iterations of KDF ratcheting produces a deterministic key sequence, we have now obtained guaranteed uniqueness for messages (replay protection) and message ordering (no out-of-order messages). This provides a highly-secure two-party E2EE scheme, but how do we handle groups of any count?
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Triple-Ratchet</h2>
      <p className="pb-4 text-justify">
        The Triple-Ratchet protocol is an extension to the Double-Ratchet protocol, utilizing an asynchronous DKG ratchet (or synchronous DKG ratchet in a fully-online model, not applicable here) to provide a “room key” as the counterparty receiver key plugged into the Double-Ratchet algorithm’s Diffie-Hellman process. This DKG ratchet can be broken down into three rounds:
      </p>
      <ol className="pb-4 pl-6 list-decimal">
        <li>Polynomial Sampling</li>
        <li>Point Calculation, Proof Construction and Commitment Distribution</li>
        <li>Point and Proof Distribution, Reconstruction</li>
      </ol>
      <h2 className="text-xl pt-10 pb-4 font-medium">Polynomial Sampling</h2>
      <p className="text-justify">
        Shamir’s Secret Sharing is a technique for encoding a secret in the form of a constant of a randomly sampled polynomial, then distributing evaluations of that polynomial to each participant such that the threshold number of participants in the scheme could perform Lagrange interpolation to reproduce the constant:
      </p>
      <p className="pb-4 text-justify">
        Given a threshold of three participants, construct a $t-1$ degree polynomial, randomly sampling coefficients ($A, B$) from the finite field, setting the constant $C$ as the secret:
      </p>
      <p className="text-center text-xl py-4">
        f(x) = Ax<sup>2</sup>+Bx+C
      </p>
      <p className="pb-4 text-justify">
        The dealer of these secret shares then evaluates the polynomial where <code>x</code> is the identifier of the participant (notably, <code>x</code> cannot equal zero as it would simply be handing the participant the secret, and likewise, <code>x</code> cannot be the order of the group either, as <code>x mod q = 0</code> where <code>x = q</code>.
      </p>
      <p className="pb-4 text-justify">
        The dealer distributes these samples to each participant, and when recombining, the participants calculate:
      </p>
      <p className="text-center flex flex-row justify-center text-xl pb-4">
        <div className="flex flex-col justify-center">C = f(0) = </div>
        <div className="inline-block pt-4"><div className="flex flex-col"><div className="text-sm">t-1</div><div className="text-4xl">Σ</div><div className="text-sm">j=0</div></div></div>
        <div className="flex flex-col justify-center pl-2"><div>y<sub>j</sub></div></div>
        <div className="inline-block pt-4"><div className="flex flex-col"><div className="text-sm">t-1</div><div className="text-4xl">Π</div><div className="text-xs"><div>(m=0)</div><div>m!=j</div></div></div></div>
        <div className="inline-block pt-6"><div className="flex flex-col border border-x-2 rounded-lg border-y-0 border-white px-2 ml-2"><div className="border border-0 border-b-2 pb-1 border-white">x<sub>m</sub></div><div>x<sub>m</sub> - x<sub>j</sub></div></div></div>
      </p>
      <p className="pb-4 text-justify">
        Shamir Secret Sharing's downside is, used directly, it only works with a known secret value, which would mean one party would have to be trusted. Thus, we have to augment this approach such that we can verify the shares are valid for all parties, and that no one party has to be trusted. To solve the first problem, Feldman Verifiable Secret Sharing (FVSS) brings the same premise, but with a verifiable proof.
      </p>
      <p className="text-justify">
        Solving the second problem, the need for a trusted dealer, simply have all parties perform FVSS and distribute polynomial samples, then calculate your local share by adding your received samples to your secret.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Point Calculation, Proof Construction and Commitment Distribution</h2>
      <p className="pb-4 text-justify">
        Following the group polynomial sampling, once all parties have received their samples and added them to their secret values, to calculate the verifiable aspect of FVSS, take the local secret as a scalar to the generator of the curve <code>s * G = P</code>.
      </p>
      <p className="pb-4 text-justify">
        Before distributing <code>P</code> to everyone, we instead calculate a zero knowledge proof that we possess the scalar corresponding to P, then present a commitment to that proof:
      </p>
      <ol className="list-decimal pl-6 text-justify">
        <li>Generate a new random scalar, <code>r<sub>i</sub></code>, and its corresponding public point <code>R<sub>i</sub> = r<sub>i</sub> * G</code>, matching the same curve parameters as the mutually agreed key.</li>
        <li>To make this process non-interactive, we will apply the Fiat-Shamir heuristic by hashing the serialized threshold sharing’s public key concatenated with the random public point: <code>ch<sub>i</sub> = H(P<sub>i</sub>||R<sub>i</sub>)</code></li>
        <li>To calculate the ZKPoK, we take the threshold secret, multiply it against the integer representation of the challenge, and add the random scalar: <code>z<sub>i</sub> = s<sub>i</sub> * ch<sub>i</sub> + r<sub>i</sub></code></li>
        <li>We finally commit to this ZKPoK by taking the hash of the serialized random public point concatenated with the ZKPoK: <code>c<sub>i</sub> = H(R<sub>i</sub>||z<sub>i</sub>)</code></li>
        <li>This commitment is to be broadcast ahead of the sharing of the public points.</li>
      </ol>
      <h2 className="text-xl pt-10 pb-4 font-medium">Point and Proof Distribution, Reconstruction</h2>
      <p className="pb-4 text-justify">
        Once all parties have broadcasted their commitments, distribute <code>P<sub>i</sub></code>, <code>z<sub>i</sub></code>, and <code>R<sub>i</sub></code>. With these values, verify:
      </p>
      <ol className='list-decimal pl-6 text-justify'>
        <li>Reproduce the challenge by hashing the concatenation of the serialized threshold sharing’s public key with the random public point: <code>ch<sub>j</sub> = H(P<sub>j</sub>||R<sub>j</sub>)</code></li>
        <li>Multiply the challenge scalar against the threshold sharing public key, then add the random public point to this point, which should equal the scalar multiplication of the ZKPoK against the generator of the curve: <code>Z<sub>j</sub> = ch<sub>j</sub> * PK<sub>j</sub> + R<sub>j</sub></code></li>
        <li>Multiply the ZKPoK against the generator of the curve and confirm this value equals the previously calculated value, and abort if this does not match: <code>z<sub>j</sub> * G = Z<sub>j</sub></code></li>
        <li>Take the hash of the serialized random public point concatenated with the ZKPoK, and confirm this matches the commitment, and abort if this does not match: <code>c<sub>j</sub> = H(R<sub>j</sub>||z<sub>j</sub>)</code></li>
        <li>If the values matched, verification has succeeded.</li>
      </ol>
      <p className="py-4 text-justify">
        Finally, all participants may do Lagrange interpolation of the polynomial with the public values of the shares (Shamir in the Exponent), iterating through all participants. The resulting output, provided no party cheated, will equal <code>P</code> for all combinations of threshold participants. If someone did cheat, some or all of the combinations will not equal <code>P</code>.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">ADKG Ratchet</h2>
      <p className="pb-4 text-justify">
        Now that we have a means to ensure no party can produce invalid fragments, we can adopt a new ratcheting scheme for DKG. Each party will (upon their need to ratchet):
      </p>
      <ol className='list-decimal pl-6 text-justify'>
        <li>Individually perform a local FVSS with PVS, and enqueue the output bundles to the respective recipients.</li>
        <li>When a new bundle is needed from a given party, the other participants will dequeue the bundle, and perform the verification process of PVS. Upon confirmation of verification, each party will recalculate the new shared polynomial, substituting the old fragment with the new to obtain a new <code>s<sub>i</sub></code>, and each party will send their public point <code>P<sub>i</sub></code>.</li>
        <li>Each party then performs FVSS’ Shamir-in-the-Exponent recombination of the public points.</li>
      </ol>
      <p className="py-4 text-justify">
        To perform Diffie-Hellman over this distributed key, swap the generator point with the other party's public key and perform the above DKG process. To visually summarize, here is an example of the entire Triple-Ratchet algorithm exchange, in a 3-of-4 threshold configuration:
      </p>
      <p className="">
        <img src={"/img/docs/learn/communication/TripleRatchet.png"}/>
      </p>
    </div>
  </div>;
}

export default E2EE;
