import React from 'react';
import { Link } from 'react-router-dom';

const RDFStorage = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="text-justify">The construction is described in the paper <a href="https://ieeexplore.ieee.org/document/7218100/">"Hypergraph Based Query Optimization"</a>, which we will use by translating the logic to OT circuits, starting with decryption into the circuit using the extended decryption process of the address content. We adopt their term definitions in this section, <Link to="/docs/hypergraph/queryplanner">Query Planner</Link>, and <Link to="/docs/hypergraph/queryevaluator">Query Evaluator</Link>. their definitions provided here roughly verbatim for convenience:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Notation:</div>
        <ol className="list-decimal pl-6">
          <li><b>RDF Graph</b> – <code>G = (V, E)</code> where <code>V = {"{"}v|v ∈ S ∪ O{"}"}</code> and <code>E = {"{"}e<sub>1</sub>, e<sub>2</sub>, ...{"}"}∃e = {"{"}u, v{"}"}</code> where <code>u, v ∈ V</code>.</li>
          <li><b>Edge Labeling Function</b> – <code>l<sub>e</sub>(S, O) = P</code>.</li>
          <li><b>Node Labeling Function</b> – <code>l<sub>v</sub>(v<sub>t</sub>) = t</code> where <code>t ∈ (S ∪ O)</code> and <code>S = Subject(URI ∪ BLANKS)</code>, <code>P = Predicate(URI)</code>, <code>O = Object(URI ∪ BLANKS ∪ LIT)</code>.</li>
          <li><b>Hypergraph</b> – <code>H(G) = (V, E)</code> where node <code>V = {"{"}v<sub>1</sub>, ..., v<sub>n</sub>{"}"}</code> and <code>E = {"{"}e<sub>1</sub>, ..., e<sub>n</sub>{"}"}</code> where <code>V = {"{"}v|v ∈ S ∪ O ∪ P{"}"}</code> and each edge <code>E</code> is a non-empty set of <code>V . ∀P, ∃e|(S<sub>i</sub>, O<sub>i</sub>) ∈ H(G)</code> where <code>1 ≤ i ≤ n</code>.</li>
          <li><b>Overlapping Hyperedge</b> – <code>(h<sub>i</sub>(G) ⊑ h<sub>i+1</sub>(G))</code> where <code>h<sub>1</sub>(G) = (S<sub>1</sub>, P<sub>1</sub>, O<sub>1</sub>)</code> and <code>h<sub>2</sub>(G) = (S<sub>2</sub>, P<sub>2</sub>, O<sub>2</sub>), (h<sub>1</sub>(G) ⊑ h<sub>2</sub>(G)) iff ∀s<sub>1</sub> ∈ S<sub>1</sub> ∈ h<sub>1</sub>(G)∃s<sub>2</sub> ∈ S<sub>2</sub> ∈ h<sub>2</sub>(G)∨∀o<sub>1</sub> ∈ O<sub>1</sub> ∈ h<sub>1</sub>(G)∃o<sub>2</sub> ∈ O<sub>2</sub> ∈ h<sub>2</sub>(G)∨∀p<sub>1</sub> ∈ P<sub>1</sub> ∈ h<sub>1</sub>(G)∃p<sub>2</sub> ∈ P<sub>2</sub> ∈ h<sub>2</sub>(G)</code>.</li>
          <li><b>Predicate-Based Index</b> – <code>I(G) = (V, E)</code> where <code>V = {"{"}v|v ∈ P<sub>i</sub> ∈ h<sub>i</sub> ∧ δ{"}"}</code> and <code>E = (v<sub>i</sub>, v<sub>j</sub>)</code> where <code>v<sub>i</sub>, v<sub>j</sub> ∈ V</code> and <code>1 ≤ i ≤ n − 1, 1 ≤ j ≤ n</code> for <code>δ ∈ V ∃e = (δ, v)</code>. <code>δ</code> is the root of the index.</li>
          <li><b>SPARQL Query</b> – <code>Q<sup>R</sup></code> contains <code>&lt;Q<sup>q</sup>, Q<sup>s</sup>, Q<sup>p</sup> &gt;</code> where <code>Q<sup>q</sup></code> is the query form and <code>Q<sup>p</sup></code> is the match pattern if <code>?x ∈ var(Q<sup>q</sup>)</code> then <code>?x ∈ var(Q<sup>p</sup>)</code> and <code>Q<sup>s</sup></code> contains constraints like <code>FILTER</code>, <code>OPTIONAL</code>.</li>
          <li><b>Query Graph</b> – <code>Q<sup>G</sup> = (V, E), V ← {"{"}var ∈ Q<sup>p</sup><sub>i</sub>{"}"}</code> and <code>E ← {"{"}P ∈ Q<sup>p</sup><sub>i</sub> ∧ (var ∈ Q<sup>p</sup><sub>i</sub>, var ∈ Q<sup>p</sup><sub>i+1</sub>){"}"}</code> where <code>1 ≤ i ≤ n</code>, <code>n</code> is the number of predicates, <code>P</code> is the predicate.</li>
          <li><b>Query Path</b> – <code>Q<sup>path</sup>∃Q<sup>path</sup>, δ → P<sub>i</sub> ∈ I(G)|P<sub>i</sub></code>. <code>size = minsize ∧ (P<sub>i</sub> → P<sub>i+1</sub>) ∈ I(G) if ∃var ∈ Q<sup>p</sup><sub>i</sub> == var ∈ Q<sup>p</sup><sub>i+1</sub></code>.</li>
          <li><b>Data Insertion</b> – Given <code>Q<sup>R</sup></code> and <code>Q<sup>p</sup></code> then check <code>∃P<sub>i</sub> ∈ Q<sup>p</sup> ∈ I(G)</code>, if true then check <code>P<sub>i</sub> ∈ H(G) ∨ create h<sub>i</sub> ∈ P<sub>i</sub> ∧ update H(G)</code> with <code>h<sub>i</sub></code>. Check if <code>∃var ∈ Q<sup>p</sup> ∈ H(G)</code>, if true then overlap <code>h<sub>i</sub></code> with <code>var</code>’s <code>h ∨ update h<sub>i</sub></code> with <code>var ∈ Q<sup>p</sup></code>.</li>
          <li><b>Data Deletion</b> – Given <code>Q<sup>R</sup></code> and <code>Q<sup>p</sup></code> then check <code>∃P<sub>i</sub> ∈ Q<sup>p</sup> ∈ I(G) ∧ P<sub>i</sub> ∈ var</code>, if true then check <code>|h<sub>i</sub>| == 0</code>, if true then remove <code>var ∈ Q<sup>p</sup> ∈ H(G) ∨</code> copy of <code>P<sub>i</sub></code> exists.</li>
        </ol>
      </div>
      <p className="pb-4 text-justify">Given these definitions, their paper proposes algorithms to perform the whole of the queries for this database:</p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Create Hypergraph:</div>
        <ol className="list-decimal pl-6">
          <li>Given an RDF graph <code>G</code> as triple <code>(S, O, P)</code>.</li>
          <li><code>V ← ∅, E ← ∅, e<sub>i</sub> ← ∅</code></li>
          <li><code>∀(S, O, P) ∈ G, V ← V ∪ V ∈ (S ∪ O ∪ P)</code>.</li>
          <li><code>∀P<sub>i</sub>|1 ≤ i ≤ n, 1 ≤ j ≤ n, ei ← {"{"}P<sub>i</sub>, {"{"}S<sub>j</sub> , O<sub>j</sub>{"}}"}, E ← e<sub>i</sub></code>.</li>
          <li><code>H(G) = (V, E)</code>.</li>
        </ol>
        <div className="pt-6">Create Predicate-Based Index:</div>
        <ol className="list-decimal pl-6">
          <li>Given a hypergraph <code>H(G)</code>.</li>
          <li>Sort hyperedges by size.</li>
          <li><code>∀h<sub>i</sub>|1 ≤ i ≤ n − 1</code>, if <code>MIN(size(h<sub>i</sub>))</code> then <code>I(G) = I(G) ∪ δ ↓ Pi, ∀j|i + 1 ≤ j ≤ n</code>, if <code>(h<sub>i</sub>(G) ⊑ h<sub>j</sub>(G)) ∧ (size(P<sub>i</sub>) == size(P<sub>j</sub>))</code> then <code>I(G) = I(G) ∪ P<sub>i</sub> ↔ P<sub>j</sub></code> else <code>I(G) = I(G) ∪ P<sub>i</sub> → P<sub>j</sub></code>.</li>
        </ol>
      </div>
    </div>
  </div>;
}

export default RDFStorage;
