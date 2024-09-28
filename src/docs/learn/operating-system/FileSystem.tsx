import React from 'react';

const FileSystem = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="text-justify">The file system uses a basic representation of loose files – while typical file systems are hierarchical, we adopt an object store more proximate to S3.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">RDF Schema</h2>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 text-sm drop-shadow-xl">
        <code className="block">:File a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a file object".</code>
        <code className="block">:FileSize a rdfs:Property</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :File.</code>
        <code className="block">:FileName a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :File.</code>
        <code className="block">:FileOctet a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :File.</code>
        <code className="block">:Block a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a block of data";</code>
        <code className="block">:FileParent a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :File.</code>
        <code className="block">:BlockHash a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Block.</code>
        <code className="block">:BlockData a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Block.</code>
        <code className="block">:BlockNumber a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :BlockData.</code>
        <code className="block">:BlockNumber a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :BlockData.</code>
        <code className="block">:BlockSize a rdfs:Property</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Block.</code>
      </div>
      <p className="pb-4 text-justify">This representation can of course be extended to provide additional features, but is sufficient for describing a basic block list associated with a file. With FUSE drivers per <a href="https://ceur-ws.org/Vol-368/paper5.pdf">RDF2FS</a>, we immediately gain a direct bridge between classical OS and Quilibrium, offering file backup capabilities.</p>
    </div>
  </div>;
}

export default FileSystem;
