import React from 'react';

const DBOS = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-10 text-justify">The idea of database-oriented operating systems is a newer idea, first formalized in <a href="https://cs.stanford.edu/~matei/papers/2022/vldb_dbos.pdf">"DBOS: A DBMS-oriented Operating System"</a>, where the authors introduce a microkernel-style base layer upon which a distributed database has raw device access, and then OS-level primitives are realized on top of the database. In the same way, we will realize OS-level primitives to make decentralized application development simpler, however, it will not involve a base level microkernel necessarily (although this is not to preclude someone from building a rumpkernel host for Quilibrium nodes), nor will these primitives be represented as sharded tables. Instead, we will rely on the hypergraph representation of RDF, and construct these resources through this. For simplicity in representation, we will use RDF syntax to define these things. Through named IRI references to the address of any graph, we can link these concepts together where relevant.</p>
    </div>
  </div>;
}

export default DBOS;
