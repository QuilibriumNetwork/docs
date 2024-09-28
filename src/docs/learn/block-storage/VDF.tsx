import React from 'react';
import { Link } from 'react-router-dom';

const VDF = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">In <a href="https://eprint.iacr.org/2018/601.pdf">"Verifiable Delay Functions"</a>, Boneh et. al. introduced a formalization of the behavior of what constitutes a verifiable delay function (VDF), along with some candidate functions. In short, the behavior of a VDF should satisfy three properties:</p>
      <ol className='list-decimal pl-6 text-justify'>
        <li><b>Sequential</b> – The processing of the function is inherently non-parallelizable.</li>
        <li><b>Efficiently Verifiable</b> – Verifying the proof output of evaluation must be sufficiently faster than calculating the proof itself.</li>
        <li><b>Unique</b> – It is computationally infeasible to find an output for a given input that collides with another output and proof.</li>
      </ol>
      <p className="pt-4 text-justify">Many constructions of VDFs relate to the problem of squaring a number repeatedly under an algebraic group that is computationally infeasible to shortcut. In a related, earlier construction, Timelock puzzles utilized squaring under an RSA group, however knowledge of the prime factors was sufficient to calculate this efficiently, i.e. a proof of spending this quantity of time is reliant on a trusted setup. Additionally, it is not universally verifiable – the verifier must be aware of the secret state.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Wesolowski VDF</h2>
      <p className="pb-4 text-justify">In <a href="https://eprint.iacr.org/2018/623">"Efficient verifiable delay functions"</a>, by Benjamin Wesolowski, a construction based around imaginary quadratic cryptography is proposed. Under certain conditions, the class group of an imaginary quadratic field enables a construction of the aforementioned repeated-squaring approach, but is efficiently and universally verifiable.</p>
      <p className="pb-4 text-justify">Other networks have adopted the use of this VDF, such as Chia Network, and by consequence of their consensus mechanism being Nakamoto consensus using VDF as a unique proof of holding space over time, the network incentives were strongly aligned to the production of ASICs which implement this VDF as efficiently as possible. We thus have a very well-defined upper bound on the performance of this approach, and node operators wishing to provide as broad a collection of proofs have specialized hardware already meaningfully available to do so. To ensure this compatibility, we have adopted the classgroup arithmetic specified in <a href="https://sonnie.org/wp-content/uploads/2021/08/BinaryQuadraticForms.pdf">"Binary quadratic forms"</a> by Lipa Long.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Bootstrapping Ceremony</h2>
      <p className="pb-4 text-justify">Using this VDF, the network initially bootstraps its master pulse clock input over the first hour of network runtime. When the network is first launched, operators will begin mesh construction following the processes of <Link to="/docs/learn/communication/p2p-communication">BlossomSub</Link>. Either after an hour is reached, or the network mesh remains sufficiently stabilized, whichever occurs first, the network will collectively perform a global <a href="https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf">KZG</a> initialization ceremony, and toss the field element, publishing the public parameters. This will serve as the genesis input for the master pulse VDF.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Consensus Intervals</h2>
      <p className="pb-4 text-justify">The VDF proofs are gossiped as a bundle every second to the network, serving as the heartbeat for BlossomSub, tagged with the current UTC time of the node creating the proof. Every hour thereafter, the network will evaluate the gossipped proofs against the global delta, as some machines will inherently emit at a slightly faster rate. The iteration count of the VDF is recalibrated to remain aligned to 10s intervals. Because there is no reward basis attached to computing the master pulse VDF, this recalibration process is not inherently tilted towards the fastest producers, but rather the mean. This is so that VDF proof generation built around ASICs is favored for block storage proofs instead.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Relationship to Block Storage</h2>
      <p className="pb-4 text-justify">To utilize the VDF for block storage, the first frame of the block snapshot will incorporate the VDF proof output from the master pulse clock at time of initiation. Subsequent iterations of the VDF will incorporate the previous iteration’s output as a selection modulo block chunk size, choosing a Merkle proof of the block to input as the next iteration.</p>
      <p className="pb-4 text-justify">To form a bond between data pulses and the master pulse clock, at the end of each hour, the polynomial commitments of the current state of the data block are broadcast – the subsequent hour admits time for gossip to be collected from all nodes, and is then merged into the inputs of the master pulse clock. This weaving pattern enables global state reconciliation, however individual clusters will always remain up to date (or participants will lose their reward).</p>
    </div>
  </div>;
}

export default VDF;
