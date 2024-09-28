import React from 'react';

const QueryEvaluator = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">Execution of queries retains the same role responsibility, where the receiver is the clique(s) (cluster(s)) responsible for the hypergraph, and the sender is the keyholder. The sender being blind to decisions of the receiver, makes the query being processed indistinguishable from gossip requests for additional data blocks, which will happen by virtue of the parent BlossomSub protocol. Again, the algorithms are produced from the <a href="https://ieeexplore.ieee.org/document/7218100/">source literature</a>:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Load Node (<code>Q<sup>p</sup><sub>i</sub>(S, O)</code>):</div>
        <ol className="list-decimal pl-6">
          <li><code>V ← ∅, E ← ∅</code></li>
          <li>Execute query on <code>h<sub>i</sub></code></li>
          <li><code>v<sub>i</sub> ← S ∧ w<sub>j</sub> ← O, V ← {"{"}v<sub>i</sub>, w<sub>j</sub>{"}"}, E ← (v<sub>i</sub>, w<sub>j</sub>), Q<sup>AG</sup><sub>i</sub> ← (V, E)</code></li>
          <li>Return <code>Q<sup>AG</sup><sub>i</sub></code></li>
        </ol>
        <div className="pt-6">Load Neighbor Node (<code>Q<sup>p</sup><sub>i</sub>, Q<sup>p</sup><sub>i+1</sub>(S, O)</code>):</div>
        <ol className="list-decimal pl-6">
          <li><code>V ← ∅, E ← ∅</code></li>
          <li>If <code>(Q<sup>p</sup><sub>i</sub>.S == Q<sup>p</sup><sub>i+1</sub>.S) ∧ (Q<sup>p</sup><sub>i</sub>.O == Q<sup>p</sup><sub>i+1</sub>.S)</code>, then if <code>∃Q<sup>p</sup><sub>i+1</sub>.O ∈ V</code> then <code>V ← V ∪ Q<sup>p</sup><sub>i</sub>.S ∧ Q<sup>p</sup><sub>i</sub>.O ∈ <sup>p</sup><sub>i+1</sub>.O, E ← (V ∈ Q<sup>p</sup><sub>i</sub>, V ∈ Q<sup>p</sup><sub>i+1</sub>)</code> else <code>V ← V ∪ Q<sup>p</sup><sub>i+1</sub>.O, E ← (V ∈ Q<sup>p</sup><sub>i</sub>, V ∈ Q<sup>p</sup><sub>i+1</sub>)</code>.</li>
          <li>Else, if <code>(Q<sup>p</sup><sub>i</sub>.S == Q<sup>p</sup><sub>i+1</sub>.O)∧(Q<sup>p</sup><sub>i</sub>.O == Q<sup>p</sup><sub>i+1</sub>.O)</code> then if <code>∃Q<sup>p</sup><sub>i+1</sub>.S ∈ V then V ← V ∪Q<sup>p</sup><sub>i</sub>.S∧Q<sup>p</sup><sub>i</sub>.O ∈ Q<sup>p</sup><sub>i+1</sub>.S, E ← (V ∈ Q<sup>p</sup><sub>i</sub>, V ∈ Q<sup>p</sup><sub>i+1</sub>), else V ← V ∪ Q<sup>p</sup><sub>i+1</sub>.S, E ← (V ∈ Q<sup>p</sup><sub>i</sub>, V ∈ Q<sup>p</sup><sub>i+1</sub>)</code>. In either case, <code>Q<sup>AG</sup> ← Q<sup>AG</sup><sub>i</sub> ∪ (V, E)</code></li>
          <li>Return <code>Q<sup>AG</sup><sub>i</sub></code></li>
        </ol>
        <div className="pt-6">Process Query:</div>
        <ol className="list-decimal pl-6">
          <li>Given a set of predicates <code>Q<sup>G</sup>, Q<sup>p</sup> and I(G)</code>.</li>
          <li><code>∀Q<sup>p</sup><sub>i</sub>|1 ≤ i ≤ n − 1</code>, if <code>i == 1</code> then execute <code>LoadNode</code> with <code>Q<sup>p</sup><sub>i</sub>(S, O)</code>, else execute <code>LoadNeighborNode</code> with <code>Q<sup>p</sup><sub>i</sub>, Q<sup>p</sup><sub>i+1</sub>(S, O)</code>.</li>
          <li>Return <code>Q<sup>AG</sup><sub>i</sub></code></li>
        </ol>
      </div>
    </div>
  </div>;
}

export default QueryEvaluator;
