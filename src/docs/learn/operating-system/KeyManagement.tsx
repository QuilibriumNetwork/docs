import React from 'react';

const KeyManagement = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="text-justify">Key management is a necessary component of the protocol, as to allow any member of a cluster to participate on their relevant side of an OT circuit. This is additionally important in the context of non-interactive processing -- where a client is not directly initiating the computation, but rather the protocol has prompted it, by virtue of task management or other functions.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">RDF Schema</h2>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 text-sm drop-shadow-xl">
        <code className="block">:Key a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a key object".</code>
        <code className="block">:KeyShare a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a share corresponding to a key".</code>
        <code className="block">:OfKey a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :Key;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :KeyShare.</code>
        <code className="block">:Format a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Key.</code>
        <code className="block">:PublicData a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Key.</code>
        <code className="block">:Protocol a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Key.</code>
        <code className="block">:KeyData a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :KeyShare.</code>
      </div>
      <p className="pb-4 text-justify">Because the distinct sections of data are effectively controlled and encrypted by the relevant keyholders, provided keyshare owners are not one and the same, the key never will exist combined on a single device, but further, even if keyshare owners are one and the same, their meaningful online use would still be reflected in the global hypergraph mutation and thus cannot be used to forge state.</p>
      <p className="pb-4 text-justify">The Protocol reference property is multi-purpose -- because it is a Literal, it may refer to a known protocol that is baked into the node software, or, if all parties are inclined to engage, can refer to an executable File reference which can contain an OT circuit, so as to enable additional MPC protocols not inherent to network function.</p>
    </div>
  </div>;
}

export default KeyManagement;
