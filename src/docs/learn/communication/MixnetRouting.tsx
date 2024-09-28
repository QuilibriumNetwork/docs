import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MixnetRouting = () => {
  const [slrp, setSLRP] = useState(0);

  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">
        Routing of messages on Quilibrium's network utilizes a mixnet approach called <a href="https://eprint.iacr.org/2022/1037">RPM</a>, in which each logical cluster (clique) permutes the messages following a threshold permutation matrix scheme.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Basics</h2>
      <p className="pb-4 text-justify">
        Mixnets at a simplified point of view can be thought of as a black box that takes in messages from senders, and relays them to recievers, such that an attacker with access to info outside this black box (but not within) cannot correlate the sender to the recipient. While mixnets have been around for a long time, the research on deanonymizing users has also vastly expanded in scope, and so advanced techniques have been developed to help preserve anonymity of users. The threat model can be summarized as the following types of attackers: 
      </p>
      <ul>
        <li><b>External, Active</b> – the attacker introduces their own traffic to the mixnet to enhance the analysis of traffic flow, or disrupt operations to better identify individuals.</li>
        <li><b>External, Passive</b> – the attacker monitors traffic to and from the mixnet operators, and the exact timings of communication that occurred.</li>
        <li><b>Internal, Active</b> – the attacker operates as a malicious mixnet node to actively drop some amounts of traffic to distinctively identify individuals.</li>
        <li><b>Internal, Passive</b> – the attacker operates as a normal mixnet node to decrypt one or more hops of the traffic.</li>
      </ul>
      <p className="py-4 text-justify">
        Our approach to solving these problems is through economic <Link to="/docs/learn/operating-system/universal-resources">disincentives</Link> making it too expensive to broadly interrupt traffic flow at the external active attacker level, our direct routing strategy through RPM detailed further below to completely make the internal active/passive attacker models fail, as they would identify the bad actor through protocol aborts, and finally through our gossip layer <Link to="/docs/communication/gossip">BlossomSub</Link> to make the external passive model infeasible.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">RPM</h2>
      <p className="pb-4 text-justify">
        Focusing strictly on the raw details of RPM before expanding to the full utilization on the network, RPM works through a technique of building a collection of random permutation matrix secret shares, along with Beaver triples in an offline process, then collecting input messages for distribution as secret-shared blocks from the senders, and collectively across the span of nodes participating, perform Shamir recombination and multiplication of the input vector through the MPC-derived permutation matrix, resulting in an output vector of messages which have no meaningful correlation to the originating sender that can be derived by any participant. To enhance the scalability of this process, instead of one large permutation matrix, smaller permutation matrices are generated and then arranged in a square lattice network, following the <a href="https://www.csc.kth.se/~johanh/jhsquare.pdf">Square Lattice Shuffle</a> technique.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">A Deeper Dive</h2>
      <p className="pb-4 text-justify">
        The RPM protocol follows three phases in its direct implementation, however we augment it with an additional process recommended in the paper for a matched request/response scheme, resulting in five phases:
      </p>
      <ol className="list-decimal pl-6">
        <li><b>Message Collection</b></li>
        <li><b>Server Permutation</b></li>
        <li><b>Broadcast</b></li>
        <li><b>Processing/Acknowledgement</b></li>
        <li><b>Transpose Mix</b></li>
      </ol>
      <p className="py-4 text-justify">
        To give a visual understanding of this process in the scope of a logical clique (cluster), click the phases in the diagram below:
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 border border-white/20 drop-shadow-xl justify-center flex flex-col">
        <img src={"/img/docs/learn/communication/SLRP" + slrp + ".png"}/>
        <div className="text-xl text-center text-black">
          <span onClick={() => setSLRP(0)} className={(slrp === 0 ? "bg-pink-400 border-pink-600 " : "") + "cursor-pointer inline-block py-1 px-3 bg-slate-100 border border-slate-200 rounded-md my-2 mx-2"}>All Phases</span> ▶
          <span onClick={() => setSLRP(1)} className={(slrp === 1 ? "bg-pink-400 border-pink-600 " : "") + "cursor-pointer inline-block py-1 px-3 bg-slate-100 border border-slate-200 rounded-md my-2 mx-2"}> Message Collection</span> ▶
          <span onClick={() => setSLRP(2)} className={(slrp === 2 ? "bg-pink-400 border-pink-600 " : "") + "cursor-pointer inline-block py-1 px-3 bg-slate-100 border border-slate-200 rounded-md my-2 mx-2"}> Server Permutation</span> ▶
          <span onClick={() => setSLRP(3)} className={(slrp === 3 ? "bg-pink-400 border-pink-600 " : "") + "cursor-pointer inline-block py-1 px-3 bg-slate-100 border border-slate-200 rounded-md my-2 mx-2"}> Broadcast</span> ▶
          <span onClick={() => setSLRP(4)} className={(slrp === 4 ? "bg-pink-400 border-pink-600 " : "") + "cursor-pointer inline-block py-1 px-3 bg-slate-100 border border-slate-200 rounded-md my-2 mx-2"}> Processing/Acknowledgement</span> ▶
          <span onClick={() => setSLRP(5)} className={(slrp === 5 ? "bg-pink-400 border-pink-600 " : "") + "cursor-pointer inline-block py-1 px-3 bg-slate-100 border border-slate-200 rounded-md my-2 mx-2"}> Transpose Mix</span>
        </div>
      </div>
      <h2 className="text-xl pt-10 pb-4 font-medium">Message Collection</h2>
      <p className="pb-4 text-justify">
       The preparation at the client level requires the creation of a Shamir split of the message <code>m</code>, that can be ordered deterministically by the servers. This is achieved by generating Shamir shares of a random value <code>r</code> given out to the client, recombined by the client, and added to the message <code>m + r</code>, blinding it. This message can be sent to the servers, who can subtract their share of <code>r</code> and collectively recombine it in the permutation phase to find <code>m</code>.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Server Permutation</h2>
      <p className="pb-4 text-justify">
        The permutation process is performed with the input vector of blinded messages <code>Y = P · (X + R) − PR</code>. This results in an output vector <code>Y</code> of unblinded messages, in completely shuffled order.
      </p>
      <p className="pb-4 text-justify">
        Calculation of a permutation matrix through a series of secret sharings first requires the calculation of a Beaver multiplication triple to perform multiplication (denoted as <code>Mul(x, y)</code>):
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 border border-white/20 drop-shadow-xl">
        <div>Offline Calculation of Permutation Matrix Sharings:</div>
        <ol className="list-decimal pl-6">
          <li>All parties generate a <code>k × k</code> permutation matrix <code>M<sub>i</sub></code> and generates secret sharings, distributing to each party</li>
          <li>All parties verify the columns and rows of each sharing using sketch checks to verify the sharings correspond to a valid permutation matrix, aborting if a check fails.</li>
          <li>All parties multiply their received matrix shares and their own share of their matrix, <code>⟨P⟩ = ⟨M<sub>1</sub>⟩⟨M<sub>2</sub>⟩...⟨M<sub>n</sub>⟩</code></li>
          <li>All parties generate k random shares, producing the vector <code>⟨R⟩ = {"{"}⟨r<sub>1</sub>⟩,⟨r<sub>2</sub>⟩, ...,⟨r<sub>k</sub>⟩{"}"}</code></li>
          <li>All parties compute <code>⟨P R⟩, = Mul(⟨P⟩,⟨R⟩)</code></li>
        </ol>
      </div>
      <p className="pt-4 text-justify">
        The online combination phase follows:
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 border border-white/20 drop-shadow-xl">
        <div>Online Matrix Permutation Recombination:</div>
        <ol className="list-decimal pl-6">
          <li>All parties receive blinded messages using chosen random shares, and are slotted into matching positions of the <code>R</code> vector</li>
          <li>All parties recombine the input vector, yielding <code>X + R</code>.</li>
          <li>All parties calculate <code>⟨Y⟩ = ⟨P⟩ · (X + R) − ⟨PR⟩</code>, and then recombine to produce <code>Y</code>.</li>
        </ol>
      </div>
      <h2 className="text-xl pt-10 pb-4 font-medium">Broadcast</h2>
      <p className="pb-4 text-justify">
        All messages are broadcast, to be retrieved by their intended recipients, following <Link to="/docs/communication/gossip">BlossomSub</Link>.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Processing/Acknowledgement</h2>
      <p className="pb-4 text-justify">
        Messages are confirmed to destination, acknowledgement message is returned.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Transpose Mix</h2>
      <p className="pb-4 text-justify">
        The transpose of the permutation matrix shares is followed of the tagged acknowledgements, producing clean acknowledgements in the same order as client requests, allowing anonymous retrieval of confirmation.
      </p>
    </div>
  </div>;
}

export default MixnetRouting;
