import React from 'react';

const P2PCommunication = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">Amending the <a href="https://arxiv.org/abs/2007.02754">GossipSub</a> protocol, we replace the topic subscription/broadcast process to not be an exact matching basis, but rather a counting bloom filter based approach, hence the name Blossom, a portmanteau of Bloom-Sum. The scoring system is also amended to take advantage of the message reconstruction protocol ensuring node mesh behaviors are correct, connectivity between nodes is altered to incorporate a circuit construction, and finally time/rate related metrics are instead replaced by generic consumption of unforgeable proofs of valid behavior. These alterations drastically improve privacy (IP collection is useless), remove cheap Sybil attack potential (by virtue of making it very expensive to overwhelm the network), and no longer require message inspection/processing at multiple points, reducing redundant compute costs.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Peer Discovery</h2>
      <p className="pb-4 text-justify">Peer discovery is achieved through an open peer exchange, where nodes will offer a score-indexed list of peers in terms of ip address and public route keys, or graph address and capabilities.</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl justify-center flex flex-col">
        <img className="pt-10" src={"/img/docs/learn/communication/BlossomSub.png"} alt="A diagram depicting the high level network structure"/>
        <div className="text-sm text-center">
          A depiction of a SLRP cluster under BlossomSub – each black circle corresponds to a node, a box with arrows indicates a participant, and 3, 2, and 1 nested circles indicate remaining envelope depth
        </div>
      </div>
      <p className="pb-4 text-justify">
        Node operation capabilities are typically self-adjusting, but in the event a node operator explicitly configures their node to enable/disable certain capabilities (at the impact of their score), only the capabilities the node broadcasts support for will be given.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Peer Connections</h2>
      <p className="pb-4 text-justify">
        Peer connections are established using the same terminology as <a href="https://arxiv.org/abs/2007.02754">GossipSub</a>, with the topics switched with a bitmask:
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Gossip Channel Join/Graft:</div>
        <ol className="list-decimal pl-6">
          <li>A node scans the list for nodes with <code>ROUTE</code> capability.</li>
          <li>At random, six nodes are picked, and an enveloped 3-depth gossip channel with each is created.</li>
          <li>The node gossips a bandwidth-adjusted <code>JOIN[bitmask]</code> message (bitmasks are calculated relative to bandwidth, this adjusts periodically) with a fresh random join public key.</li>
          <li>Nodes processing within that bitmask will gossip a <code>GRAFT[bitmask]</code> message with a fresh random graft public key, exchanged with the gossiped <code>JOIN</code> key. This <code>GRAFT</code> should only occur on one of the gossip channels.</li>
          <li>Nodes accepting the <code>GRAFT</code> initiate an ad-hoc join of Triple-Ratchet for the cluster, and begin participation in SLRP.</li>
        </ol>
      </div>
      <p className="pb-4 text-justify">
        For routing functionality, we can adopt the basic GossipSub scoring mechanism:
      </p>
      <p className="text-center flex flex-row justify-center text-xl pb-4">
        <div className="flex flex-col justify-center">Score(peer) = TC(</div>
        <div className="inline-block"><div className="flex flex-col"><div className="text-sm">4</div><div className="text-4xl">Σ</div><div className="text-sm">n=1</div></div></div>
        <div className="flex flex-col justify-center pl-2"><div>w<sub>n,t</sub>P<sub>n,t</sub>) + w<sub>5</sub>P<sub>5</sub> + w<sub>6</sub>P<sub>6</sub></div></div>
      </p>
      <p className="pb-4 text-justify">
        The values in this formula are defined as environment-specific weights <code>w<sub>i</sub></code>, and parameter values, <code>P<sub>1</sub></code> through <code>P<sub>4</sub></code> are further indexed to the specific topic and capped per <code>TC</code>. The parameters are defined as follows:
      </p>
      <ol className='list-decimal pl-6 text-justify'>
        <li><b>Time in Mesh for Topic</b> – The time spent as a member of the mesh for the given topic.</li>
        <li><b>First Message Deliveries for Topic</b> – The count of times the peer was the first to deliver messages for the topic.</li>
        <li><b>Mesh Message Delivery Rate/Failures for Topic</b> – The delivery metric intended to penalize peers engaging in behaviors likely to be explicitly dropping messages.</li>
        <li><b>Invalid Messages for Topic</b> – The metric intended to penalize peers delivering application-invalid messages.</li>
        <li><b>Application-Specific Score</b> – A deferring score that is application-specific and left to implementation.</li>
        <li><b>IP Collocation Factor</b> – The metric penalizing the number of peers connecting from the same IP address, that surpasses an application-controlled threshold.</li>
      </ol>
      <p className="pb-4 text-justify">
        To preserve anonymity and unlinkability of application-level functions, the other functions are only associated with a graph address and carry an implicit scoring system:
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Implicit Node Scoring:</div>
        <ol className="list-decimal pl-6">
          <li><code>V = Σ<sup>n</sup><sub>i=1</sub>r<sub>i</sub>v<sub>i</sub></code>, where <code>V</code> is the aggregate sum of duration of data blocks made available <code>v<sub>i</sub></code>, and the rate at which they were requested <code>r<sub>i</sub></code>. The purpose is to reward long-term retention of data.</li>
          <li><code>A = avg({"{"}r<sub>1</sub>a<sub>1</sub>, r<sub>2</sub>a<sub>2</sub>, ..., r<sub>n</sub>a<sub>n</sub>{"}"})</code>, where <code>A</code> is the averaged ratio of attested data requests processed:unprocessed, and the inverse rate at which they were requested. The purpose is to reward rare data deliverability.</li>
          <li><code>Score = V + A</code></li>
        </ol>
      </div>
    </div>
  </div>;
}

export default P2PCommunication;
