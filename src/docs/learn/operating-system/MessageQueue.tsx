import React from 'react';

const MessageQueue = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="text-justify">Construction of a basic message queue can be achieved by a linked list, with a parent reference.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">RDF Schema</h2>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 text-sm drop-shadow-xl">
        <code className="block">:Queue a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a FIFO queue".</code>
        <code className="block">:QueueNode a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a node in a queue".</code>
        <code className="block">:HeadNode a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :QueueNode;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Queue.</code>
        <code className="block">:NextNode a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :QueueNode;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :QueueNode.</code>
        <code className="block">:QueueMessage a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :QueueNode.</code>
      </div>
    </div>
  </div>;
}

export default MessageQueue;
