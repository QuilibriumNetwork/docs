import React from 'react';

const QueryPlanner = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">For query planning, the sender role is conducted by the key holder for the relevant resources. The receiver role is conducted by the clique(s) (cluster(s)) responsible for the hypergraph. Again, these algorithms are produced from the <a href="https://ieeexplore.ieee.org/document/7218100/">source literature</a>:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Create SPARQL Query Graph:</div>
        <ol className="list-decimal pl-6">
          <li>Given a query match pattern <code>Q<sup>p</sup> ∈ Q<sup>R</sup></code>.</li>
          <li><code>V ← ∅, E ← ∅</code></li>
          <li><code>∀Q<sup>p</sup><sub>i</sub>|1 ≤ i</code></li>
          <ol className="list-decimal pl-6">
            <li>if <code>i == 1, V ← V ∪ (var ∈ Q<sup>p</sup><sub>i</sub>.S ∪ var ∈ Q<sup>p</sup><sub>i</sub>.O), E ← (var ∈ Q<sup>p</sup><sub>i</sub>.S, var ∈ Q<sup>p</sup><sub>i</sub>.O)</code></li>
            <li>if <code>i ≥ 2</code>, if <code>(var ∈ Q<sup>p</sup><sub>i</sub>.S == var ∈ Q<sup>p</sup><sub>i+1</sub>.S) ∧ (var ∈ Q<sup>p</sup><sub>i</sub>.O == var ∈ Q<sup>p</sup><sub>i+1</sub>.S)</code> then <code>V ← V ∪ var ∈ Q<sup>p</sup><sub>i</sub>.S, E ← (var ∈ Q<sup>p</sup><sub>i</sub>, var ∈ Q<sup>p</sup><sub>i+1</sub>)</code> else <code>V ← V ∪ var ∈ Q<sup>p</sup><sub>i+1</sub>.O, E ← (var ∈ Q<sup>p</sup><sub>i</sub>, var ∈ Q<sup>p</sup><sub>i+1</sub>)</code></li>
            <li>else, if <code>(var ∈ Q<sup>p</sup><sub>i</sub>.S == var ∈ Q<sup>p</sup><sub>i+1</sub>.O) ∧ (var ∈ Q<sup>p</sup><sub>i</sub>.O == var ∈ Q<sup>p</sup><sub>i+1</sub>.O)</code> then if <code>∃var ∈ Q<sup>p</sup><sub>i+1</sub>.S ∈ V, V ← V ∪ var ∈ Q<sup>p</sup><sub>i</sub>.S, E ← (var ∈ Q<sup>p</sup><sub>i</sub>, var ∈ Q<sup>p</sup><sub>i+1</sub>)</code>. <code>MIN(size(h<sub>i</sub>))</code> then <code>I(G) = I(G) ∪ δ ↓ P<sub>i</sub>, ∀j|i + 1 ≤ j ≤ n, if (h<sub>i</sub>(G) ⊑ h<sub>j</sub>(G)) ∧ (size(P<sub>i</sub>) == size(P<sub>j</sub>))</code> then <code>I(G) = I(G) ∪ P<sub>i</sub> ↔ P<sub>j</sub></code> else <code>I(G) = I(G) ∪ P<sub>i</sub> → P<sub>j</sub></code>.</li>
            <li>if not <code>(var ∈ Q<sup>p</sup><sub>i</sub>.S == var ∈ Q<sup>p</sup><sub>i+1</sub>.O) ∧ (var ∈ Q<sup>p</sup><sub>i</sub>.O == var ∈ Q<sup>p</sup><sub>i+1</sub>.O)</code>, then <code>V ← V ∪ var ∈ Q<sup>p</sup><sub>i+1</sub>.S, E ← (var ∈ Q<sup>p</sup><sub>i</sub>, var ∈ Q<sup>p</sup><sub>i+1</sub>)</code>.</li>
          </ol>
          <li><code>Q<sup>G</sup> = (V, E)</code></li>
        </ol>
        <div className="pt-6">Create Query Path:</div>
        <ol className="list-decimal pl-6">
          <li>Given a set of predicates <code>P ∈ Q<sup>G</sup>, Q<sup>G</sup> and I(G)</code>.</li>
          <li>Start from <code>δ</code>.</li>
          <li><code>Q<sup>path</sup> ← δ → min(size(P<sub>i</sub>)) ∈ I(G)</code></li>
          <li><code>∀Q<sub>i</sub>|1 ≤ i ≤ n − 1, i + 1 ≤ j ≤ n</code>, if <code>∃var ∈ Q<sup>p</sup><sub>i</sub> ∈ Q<sup>G</sup> == var ∈ Q<sup>p</sup><sub>j</sub> ∈ Q<sup>G</sup></code>, then <code>Q<sup>path</sup> ← Q<sup>path</sup> ∪ (P<sub>i</sub> → P<sub>j</sub>) ∈ I(G)</code>.</li>
        </ol>
      </div>
    </div>
  </div>;
}

export default QueryPlanner;
