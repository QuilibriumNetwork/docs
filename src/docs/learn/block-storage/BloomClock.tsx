import React from 'react';
import { Link } from 'react-router-dom';

const BloomClock = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="pb-4 text-justify">
        As <Link to="/docs/learn/communication/mixnet-routing">SLRP</Link> clusters admit messages which alter the processed blocks structurally, the messages under the capture window are collected as inputs to a bloom clock for the block, and thus the clock filter is joined with the subsequent Merkle proof selection, forming the new input for the data pulse. To attach an intrinsic reward basis, the data pulse clock is additionally run on the same data, for each interval encrypted using a proof reward key exchanged with a public ephemeral key to form a symmetric key, then subsequently the private ephemeral key is revealed as the input of the next pulse.
      </p>
    </div>
  </div>;
}

export default BloomClock;
