import React from 'react';

const ObliviousTransfer = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">Oblivious Transfer is a cryptographic technique in which a sender and a receiver engage in a series of messages between one another such that a sender has messages which a receiver can request, the receiver makes a choice, and prepares a response which the sender consumes and applies to the messages being sent but is unaware of the choice made by the receiver, then responds with the choice-applied message data such that upon receipt by the receiver, they are able to consume the intended message, but gain no awareness of the contents of the other messages.</p>
      <p className="pb-4 text-justify">We begin by explaining some base concepts of oblivious transfer protocols such that it becomes easier to follow along in the broader construction.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Simplest OT</h2>
      <p className="text-justify">In <a href="https://eprint.iacr.org/2015/267.pdf">"The Simplest Protocol for Oblivious Transfer"</a>, Chou and Orlandi defined a new approach to oblivious transfer in which the construction relied only on the same assumptions as Diffie-Hellman. The approach is summarized below:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Simplest OT:</div>
        <ol className="list-decimal pl-6">
          <li>Given a sender has two messages, <code>m<sub>0</sub>, m<sub>1</sub></code>, and a receiver has a choice bit <code>c</code>, both parties sample a random private scalar <code>x ← 𝔽<sub>p</sub></code> The sender’s private scalar will be denoted as <code>a</code>, the receiver’s private scalar will be denoted as <code>b</code>.</li>
          <li>The sender calculates the point <code>A = a · G</code>, and sends this to the receiver.</li>
          <li>If the receiver’s choice bit is <code>0</code>, the receiver replies with <code>B = b · G</code>. If <code>1</code>, the receiver replies with <code>B = A + (b · G)</code>.</li>
          <li>The sender calculates two keys, <code>k<sub>0</sub> = H(a · B)</code>, and <code>k<sub>1</sub> = H(a · (B − A))</code>, then encrypts <code>m<sub>0</sub></code> with <code>k<sub>0</sub></code>, <code>m<sub>1</sub></code> with <code>k<sub>1</sub></code>, and sends both encrypted messages to the receiver.</li>
          <li>The receiver calculates <code>k<sub>c</sub> = H(b · A)</code>, and then uses this value to decrypt their chosen message.</li>
        </ol>
      </div>
      <p className="pb-4 text-justify">Because neither party has the other party’s private scalar, provided the discrete logarithm assumption holds, it is impossible for the receiver to calculate the other message’s key, and impossible for the sender to calculate the receiver’s choice.</p>
      <p className="text-justify">Simplest OT is capable of only delivering a singular choice of two messages, and has to be re-evaluated from scratch for each subsequent bit of information learned. Because of this, it is a poor system to directly construct oblivious protocols, however it is exceptionally useful to build on top of as a base OT seed for extension.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Correlated OT</h2>
      <p className="text-justify">Correlated oblivious transfer is a variant of oblivious transfer where instead of sending a singular choice, the choices themselves are implicitly correlated. The traditional <a href="https://www.iacr.org/archive/crypto2003/27290145/27290145.pdf">extension approach</a> involves a Random OT base, where the initial choice is random, and then pseudo-random extensions of the random seeds enable larger correlated constructions with many bits being able to be transferred based on the correlation without the cost of doing a singular OT for every bit. This is utilized in many MPC protocols, and further extended in subsequent papers such as <a href="https://eprint.iacr.org/2015/546.pdf">"Actively Secure OT Extension with Optimal Overhead"</a>. At the lower level, correlated OT looks like the following:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Correlated OT (COT):</div>
        <ol className="list-decimal pl-6">
          <li>The receiver obtains a <code>∆ ∈ 𝔽<sub>2<sup>κ</sup></sub></code> from the sender.</li>
          <li>For every extension:</li>
          <ol className="list-[lower-alpha] pl-6">
            <li>Sample <code>v ← 𝔽<sup>ℓ</sup><sub>2<sup>κ</sup></sub></code>. If the sender is corrupted, instead receive <code>v ← 𝔽<sup>ℓ</sup><sub>2<sup>κ</sup></sub></code> from the adversary.</li>
            <li>Sample <code>u ← 𝔽<sup>ℓ</sup><sub>2</sub></code> and compute <code>w := v + u · ∆ ∈ 𝔽<sup>ℓ</sup><sub>2<sup>κ</sup></sub></code>. If the receiver is corrupted, instead receive <code>u ← 𝔽<sup>ℓ</sup><sub>2</sub></code> and <code>w ← 𝔽<sup>ℓ</sup><sub>2<sup>κ</sup></sub></code> from the adversary, and recompute <code>w := v + u · ∆ ∈ 𝔽<sup>ℓ</sup><sub>2<sup>κ</sup></sub></code>.</li>
          </ol>
        </ol>
      </div>
      <h2 className="text-xl pt-10 pb-4 font-medium">Correlated OT Extension over LPN</h2>
      <p className="text-justify">In <a href="https://eprint.iacr.org/2020/924.pdf">"Ferret: Fast Extension for Correlated OT with Small Communication"</a>, the authors contributed improvements to this protocol have sufficiently made COT feasible for general computability at speed. In short, the speed improvements are nearly over 200 times faster per correlation. For brevity, we list only the functions relevant to Quilibrium’s instantiation of Ferret, from the article:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Multi-Point Correlated OT (MPCOT):</div>
        <ol className="list-decimal pl-6">
          <li>Given a family of efficiently-computable functions <code>Φ = {"{"}Φ<sub>n,t</sub>{"}"}<sub>n,t ∈ ℕ</sub></code> such that for any <code>n,t ∈ ℕ</code> with <code>t ≤ n, Φ<sub>n,t</sub></code> takes as an input a sorted subset of <code>[n]</code> of size <code>t</code> and outputs another subset of <code>[m]</code> with the same size for some integer <code>t ≤ m ≤ n.</code></li>
          <li>The receiver obtains a <code>∆ ∈ 𝔽<sub>2<sup>κ</sup></sub></code> from the sender.</li>
          <li>For extension, the receiver and sender agree to <code>n, t</code>, and the receiver sends <code>Q = {"{"}a<sub>0</sub>, ..., a<sub>t−1</sub>{"}"}</code> where <code>Q ⊆ [n]</code> is a sorted set:</li>
          <ol className="list-[lower-alpha] pl-6">
            <li>Sample <code>v ← 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code>. If the sender is corrupted, instead receive <code>v ← 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code> from the adversary.</li>
            <li>Define an <code>n</code>-sized bit vector <code>u := 𝕴(n, Q)</code>, and compute <code>w := v + u · ∆ ∈ 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code>.  If the receiver is corrupted, instead receive <code>u ← 𝔽<sup>n</sup><sub>2</sub></code> and <code>w ← 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code> from the adversary, and recompute <code>w := v + u · ∆ ∈ 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code>.</li>
          </ol>
          <li>Compute the set <code>T = {"{"}β<sub>0</sub>, ..., β<sub>t−1</sub>{"}"} := Φ<sub>n,t</sub>({"{"}α<sub>0</sub>, ..., α<sub>t−1</sub>{"}"})</code>.</li>
          <li>Wait for the adversary to input <code>m</code> sets <code>I<sub>0</sub>, ..., I<sub>m−1</sub> ⊆ [n] ∪ {"{"}−1{"}"}</code>.</li>
          <li>Check that <code>α<sub>i</sub> ∈ I<sub>β<sub>i</sub></sub></code> for all <code>i ∈ [t]</code> and <code>−1 ∈ I<sub>j</sub></code> for all <code>j ∈ [m] \ T</code>. If the check fails, the process aborts.</li>
        </ol>
        <div className="pt-6">Deal COT/MPCOT:</div>
        <ol className="list-decimal pl-6">
          <li>Given a family of efficiently-computable functions <code>Φ = {"{"}Φ<sub>n,t</sub>{"}"}<sub>n,t ∈ ℕ</sub></code> such that for any <code>n,t ∈ ℕ</code> with <code>t ≤ n, Φ<sub>n,t</sub></code> takes as an input a sorted subset of <code>[n]</code> of size <code>t</code> and outputs another subset of <code>[m]</code> with the same size for some integer <code>t ≤ m ≤ n.</code></li>
          <li>The receiver obtains a <code>∆ ∈ 𝔽<sub>2<sup>κ</sup></sub></code> from the sender.</li>
          <li>To COT Extend: Call Correlated OT, receive <code>ℓ</code> random COT correlations.</li>
          <li>To MPCOT Extend: Call MPCOT, receive a multi-point COT of length <code>n</code>.</li>
        </ol>
        <div className="pt-6">Deal COT/MPCOT:</div>
        <ol className="list-decimal pl-6">
          <li>Given LPN parameters <code>(n, k, t)</code> and code generator <code>C</code> such that <code>C(k, n, 𝔽)</code> outputs a matrix <code>A ∈ 𝔽<sup>k×n</sup><sub>2</sub></code>.</li>
          <li>Both parties initialize once, sender samples a uniform <code>∆ ∈ 𝔽<sub>2<sup>κ</sup></sub></code> and both parties invoke the Deal initialization step.</li>
          <li>Both parties invoke the COT extend functionality of Deal, returning <code>v ← 𝔽<sup>k</sup><sub>2<sup>κ</sup></sub></code> to sender, <code>(u, w) ∈ 𝔽<sup>k</sup><sub>2</sub> × 𝔽<sup>k</sup><sub>2<sup>κ</sup></sub></code> to the receiver such that <code>w := v + u · ∆</code>.</li>
          <li>To Extend:</li>
          <ol className="list-[lower-alpha] pl-6">
            <li>The receiver samples <code>A ← C(k, n, 𝔽<sub>2</sub>)</code> and <code>e ← HW<sub>t</sub></code>, then sends <code>A</code> to the sender. Let <code>Q = {"{"}a<sub>0</sub>, ..., a<sub>t−1</sub>{"}"} ⊆ [n]</code> be the sorted indices of non-zero entries in <code>e</code>.</li>
            <li>The sender and receiver invokes the Deal MPCOT functionality, returning <code>s ∈ 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code> to the sender and <code>r ∈ 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code> to the receiver, where <code>r + s = e · ∆</code>. If either party aborts, this protocol aborts.</li>
            <li>The sender computes <code>y := v · A + s ∈ 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code> and the receiver computes <code>x := u · A + e ∈ 𝔽<sup>n</sup><sub>2</sub></code> and <code>z := w · A + r ∈ 𝔽<sup>n</sup><sub>2<sup>κ</sup></sub></code>.</li>
            <li>The sender updates vector <code>v := y[0 : k] ∈ 𝔽<sup>k</sup><sub>2<sup>κ</sup></sub></code>, and outputs a vector <code>y′ := y[k : n] ∈ 𝔽<sup>l</sup><sub>2<sup>κ</sup></sub></code>. The receiver updates vectors <code>(u, w) := (x[0 : k], z[0 : k]) ∈ 𝔽<sup>k</sup><sub>2</sub> × 𝔽<sup>k</sup><sub>2<sup>κ</sup></sub></code> and outputs two vectors <code>(x′, z′) := (x[k : n], z[k : n]) ∈ 𝔽<sup>l</sup><sub>2</sub> × 𝔽<sup>l</sup><sub>2<sup>κ</sup></sub></code>.</li>
          </ol>
        </ol>
      </div>
    </div>
  </div>;
}

export default ObliviousTransfer;
