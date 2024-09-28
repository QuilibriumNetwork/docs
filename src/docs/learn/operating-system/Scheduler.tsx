import React from 'react';

const Scheduler = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="text-justify">We define a scheduler based on two possible types, a priority-based scheduler (where tasks can be easily ordered as a max-heap), and a cron-based scheduler (where repeated tasks will get picked up at increments aligned to the schedule).</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">RDF Schema</h2>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 text-sm drop-shadow-xl">
        <code className="block">:Task a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a simple task".</code>
        <code className="block">:TaskData a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :File;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Task.</code>
        <code className="block">:TaskPriority a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a one-time execution parameter that indicates the 0-255 priority, in order of priority";</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Task.</code>
        <code className="block">:TaskSchedule a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "A cron string that describes the frequency to evaluate the task";</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Task.</code>
        <code className="block">:TaskResult a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:File;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Task.</code>
      </div>
    </div>
  </div>;
}

export default Scheduler;
