import React from 'react';

const Accounts = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <p className="text-justify">Accounts are the aspect that allows one to assert both identity and balances. The network reward token will be a Coin, which in a simple form would be merely an exchangeable, splittable unit of balance, but in the historic context of cryptocurrencies, there have been problems discovered in both public block chains and private block chains. The Quilibrium network is a private computation network, and by virtue there exists an ethical dilemma: rigid financial institutions cannot accept a coin without explicit proof of legitimacy, but people deserve a right to financial privacy. To counteract this problem, we adopt a bloom filter property, which on the transfer of a coin, the circuit will apply the holding account's public address. Because a user may wish to check this coin against a public registry of known bad actors, they may reference a public list provided by a financial institution, wherein they can choose to accept this coin, or reject it, which will result in its completed transfer to the designated refund address. Coins may be joined together, with the caveat that the bloom filter will also be unioned, but the choice of joining is at the behest of the owner. Similarly, Coins may be split, but will inherit the bloom filter.</p>
      <h2 className="text-xl pt-10 pb-4 font-medium">RDF Schema</h2>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 text-sm drop-shadow-xl">
        <code className="block">:Account a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "an account object".</code>
        <code className="block">:Coin a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "an object containing a numeric balance and historical lineage".</code>
        <code className="block">:CoinBalance a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Coin.</code>
        <code className="block">:OwnerAccount a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Account;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Coin.</code>
        <code className="block">:LineageFilter a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Literal;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :Coin.</code>
        <code className="block">:PendingTransaction a rdfs:Class;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:label "a pending transaction".</code>
        <code className="block">:ToAccount a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Account;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :PendingTransaction.</code>
        <code className="block">:RefundAccount a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain rdfs:Account;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :PendingTransaction.</code>
        <code className="block">:OfCoin a rdfs:Property;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:domain :Coin;</code>
        <code className="block">&nbsp;&nbsp;&nbsp;&nbsp;rdfs:range :PendingTransaction.</code>
      </div>
    </div>
  </div>;
}

export default Accounts;
