import React from 'react';

const HypergraphConstruction = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-10 text-justify">Hypergraphs are a generalization of graphs in which the edges are capable of connecting more than two vertices, and thus are referred to as hyperedges. There are many higher-degree relationships which can be expressed over hypergraphs, such that any variety of database model can be directly expressed over one. This makes a hypergraph a useful tool for representing and querying such data. Performance is not always of course <i>better</i> under a hypergraph, but the generalization is valuable in that it lends to a query pattern that is able to be efficiently made oblivious. In the context of Quilibrium, any hypergraph-oriented approach is amenable as the clients can be updated to support them, however to realize most immediately useful functionality in bridging traditional web resources with decentralized resources, we firstly implement our data mapping strategy as an engine for querying RDF graphs.</p>
    </div>
  </div>;
}

export default HypergraphConstruction;
