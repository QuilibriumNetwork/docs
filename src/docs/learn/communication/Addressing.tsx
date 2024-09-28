import React, { useEffect, useRef, useState } from 'react';
import Admonition from "@theme/Admonition";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ForceGraph from './ForceGraph';

interface GraphNode {
  id: string;
  group: number;
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

const Simulator = () => {
  var [graph, setGraph] = useState<Graph>({
    nodes: [],
    links: [],
  });

  const [initialNodes, setInitialNodes] = useState<GraphNode[]>([]);
  const [initialLinks, setInitialLinks] = useState<GraphLink[]>([]);
  const [finalNodes, setFinalNodes] = useState<GraphNode[]>([]);
  const [sNodes, setSNodes] = useState<GraphNode[]>([]);
  const [setDivSLinks, setSetDivSLinks] = useState<GraphLink[]>([]);
  const [finalLinks, setFinalLinks] = useState<GraphLink[]>([]);

  useEffect(() => {
    if (graph.nodes.length === 0) {
      let nodeCount = 12;
      let inodes: GraphNode[] = [];
      let ilinks: GraphLink[] = [];
      let fnodes: GraphNode[] = [];
      let snodes: GraphNode[] = [];
      let divslinks: GraphLink[] = [];
      let flinks: GraphLink[] = [];
      for (let i = 0; i < nodeCount; i++) {
        inodes.push({id: i + "", group: 1});
      }

      for (let i = 0; i < nodeCount - 1; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (i !== j) {
            if (Math.random() < .5) {
              ilinks.push({source: i + "", target: j + "", value: 2});
            }
          }
        }
      }

      let k = Math.round(1.96 * Math.log(nodeCount))
      let padd = .545;

      for (let n = 0; n < k;) {
        let node = Math.round(Math.random() * (nodeCount - 1));

        if (!snodes.find(s => s.id === (node + ""))) {
          snodes.push({id: node + "", group: 2});
          n++;
        }
      }

      for (let i = 0; i < nodeCount; i++) {
        let node = inodes[i];
        if (snodes.find(s => s.id === node.id)) {
          fnodes.push({...node, group: 2});
        } else {
          fnodes.push({...node});
        }
      }

      for (let i = 0; i < ilinks.length; i++) {
        if (!(snodes.find(s => s.id === ilinks[i].source) && snodes.find(s => s.id === ilinks[i].target))) {
          divslinks.push(ilinks[i]);
        }
      }

      for (let i = 0; i < inodes.length; i++) {
        if (snodes.find(s => s.id === inodes[i].id) === undefined) {
          let candidateSet: GraphLink[] = [];
          let completeSet: GraphLink[] = [];

          for (let j = 0; j < divslinks.length; j++) {
            if (divslinks[j].source === inodes[i].id || divslinks[j].target === inodes[i].id) {
              if (snodes.find(s => s.id === divslinks[j].source) || snodes.find(s => s.id === divslinks[j].target)) {
                candidateSet.push({...divslinks[j]});
              } else {
                completeSet.push({...divslinks[j]});
              }
            }
          }

          if (candidateSet.length % 2 === 1) {
            if (Math.random() < padd) {
              let vs = snodes.filter(s => !candidateSet.find(c => c.source === s.id || c.target === s.id));
              let vchoice = Math.floor(Math.random() * (vs.length - 1));
              candidateSet.push({source: inodes[i].id, target: vs[vchoice].id, value: 2});
            } else {
              let cchoice = Math.floor(Math.random() * (candidateSet.length - 1));
              candidateSet.splice(cchoice, 1);
            }
          }

          completeSet.push(...candidateSet);
          flinks.push(...completeSet);
        }
      }
      setGraph({
        nodes: inodes,
        links: ilinks,
      });
      setInitialNodes(inodes);
      setInitialLinks(ilinks);
      setSetDivSLinks(divslinks);
      setFinalLinks(flinks);
      setFinalNodes(fnodes);
      setSNodes(snodes);
    }
  }, [graph]);

  const diagram = ForceGraph(graph, {
    nodeId: (d: any) => d.id,
    nodeGroup: (d: any) => d.group,
    nodeTitle: (d: any) => `${d.id} (${d.group})`,
    width: 300,
    height: 300,
    nodeStroke: '#ffffff',
    linkStroke: '#ffffff',
    nodeRadius: 10,
    nodeStrength: -100,
    linkStrength: .001,
  } as any);

  const svg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (svg.current) {
      if (svg.current.lastElementChild) {
        svg.current.removeChild(svg.current.lastElementChild);
      }
      svg.current.appendChild(diagram as unknown as any)
    }
  }, [diagram]);

  return <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-100 drop-shadow-xl justify-center flex flex-col">
    <div className="Simulator flex flex-row justify-center p-6" ref={svg}></div>
    <div className="text-xl text-center">
      <span onClick={() => setGraph({nodes: initialNodes, links: initialLinks})}
            className={(graph.links === initialLinks && graph.nodes === initialNodes ? "text-pink-400 " : "") + "cursor-pointer"}>Generate graph</span> →
      <span onClick={() => setGraph({nodes: finalNodes, links: initialLinks})}
            className={(graph.links === initialLinks && graph.nodes === finalNodes ? "text-pink-400 " : "") + "cursor-pointer"}> Choose subset</span> →
      <span onClick={() => setGraph({nodes: finalNodes, links: setDivSLinks})}
            className={(graph.links === setDivSLinks && graph.nodes === finalNodes ? "text-pink-400 " : "") + "cursor-pointer"}> Remove inner-subset edges</span> →
      <span onClick={() => setGraph({nodes: finalNodes, links: finalLinks})}
            className={(graph.links === finalLinks && graph.nodes === finalNodes ? "text-pink-400 " : "") + "cursor-pointer"}> Ensure even connections to S</span>
    </div>
  </div>
}

const Addressing = () => {
  return <div className="learn-page text-left flex md:flex-row flex-col text-slate">
    <div className="flex-1">
      <Admonition type={"warning"}>
        <p>
          This section is out of date.
        </p>
      </Admonition>
      <p className="pb-10 text-justify">
        Reaching other resources is conducted via an addressing scheme, called the Planted Clique Addressing Scheme (PCAS).
        At a high level, the address is a hex string produced from hashing the public key of the user's private key. In this asymmetric cryptography
        implementation, the public key is an adjacency matrix of a graph, the private key is the planted clique within the compliment graph.
      </p>
      <h2 className="text-xl pb-4 font-medium">Basics</h2>
      <p>
        Let's walk through this with a simplified example where the planted clique is directly extracted from the graph as the private key. A clique is a collection of nodes within a graph that are fully connected to one another. Pictured is a graph of twelve nodes. Can you find the 5-clique in the graph?
      </p>
      <div className="pt-10 text-center">
        <img className="lg:max-w-lg lg:min-w-lg md:max-w-md sm:max-w-sm inline-block" src={"/img/docs/learn/communication/PCAS-unlit.png"}/>
      </div>
      <p>
        Even with twelve nodes and a 5-clique and asymmetric adjacency counts, it can still be pretty tough to simply spot it. Algorithmically, when using a random graph with a planted clique, it's an NP-complete problem. But when you know the specific clique, it takes no time at all:
      </p>
      <div className="pt-10 text-center">
        <img className="lg:max-w-lg lg:min-w-lg md:max-w-md sm:max-w-sm inline-block" src={"/img/docs/learn/communication/PCAS-lit.png"}/>
      </div>
      <p>
        Representing this as an adjacency matrix, the graph would look like this (clique <span className="text-pink-400">highlighted</span>), compacted, and then serialized:
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl flex xl:flex-row md:flex-col flex-col justify-center text-center">
        <div className="flex flex-row justify-center">
          <div className="border border-4 border-white border-r-0 w-2 mr-4"></div>
          <div className="w-64 text-center md:text-base text-sm">
            <code className="block">
              <span className="text-slate-400">0 0 0 0 0 1 1 0 0 0 0 0</span>
            </code>
            <code className="block">
              0 <span className="text-slate-400">0 0 0 <span className="text-pink-400">1</span> <span className="text-pink-400">1</span> 0 0 <span className="text-pink-400">1</span> 0 <span className="text-pink-400">1</span> 0</span>
            </code>
            <code className="block">
              0 0 <span className="text-slate-400">0 1 0 0 0 1 1 1 1 0</span>
            </code>
            <code className="block">
              0 0 1 <span className="text-slate-400">0 0 0 0 1 1 0 0 1</span>
            </code>
            <code className="block">
              0 <span className="text-pink-400">1</span> 0 0 <span className="text-slate-400">0 <span className="text-pink-400">1</span> 0 0 <span className="text-pink-400">1</span> 0 <span className="text-pink-400">1</span> 1</span>
            </code>
            <code className="block">
              1 <span className="text-pink-400">1</span> 0 0 <span className="text-pink-400">1</span> <span className="text-slate-400">0 1 1 <span className="text-pink-400">1</span> 0 <span className="text-pink-400">1</span> 0</span>
            </code>
            <code className="block">
              1 0 0 0 0 1 <span className="text-slate-400">0 1 0 0 0 1</span>
            </code>
            <code className="block">
              0 0 1 1 0 1 1 <span className="text-slate-400">0 0 0 0 1</span>
            </code>
            <code className="block">
              0 <span className="text-pink-400">1</span> 1 1 <span className="text-pink-400">1</span> <span className="text-pink-400">1</span> 0 0 <span className="text-slate-400">0 0 <span className="text-pink-400">1</span> 0</span>
            </code>
            <code className="block">
              0 0 1 0 0 0 0 0 0 <span className="text-slate-400">0 0 0</span>
            </code>
            <code className="block">
              0 <span className="text-pink-400">1</span> 1 0 <span className="text-pink-400">1</span> <span className="text-pink-400">1</span> 0 0 <span className="text-pink-400">1</span> 0 <span className="text-slate-400">0 0</span>
            </code>
            <code className="block">
              0 0 0 1 1 0 1 1 0 0 0 <span className="text-slate-400">0</span>
            </code>
          </div>
          <div className="border border-4 border-white border-l-0 w-2 ml-4"></div>
        </div>
        <div className="ml-4 flex flex-col justify-center text-4xl">
          <span className="xl:inline-block hidden">⮕</span>
          <span className="xl:hidden inline-block">⬇</span>
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <code>b00</code>
          <code>00010100</code>
          <code>11001100</code>
          <code>00100110</code>
          <code>11011111</code>
          <code>00001000</code>
          <code>00001101</code>
          <code>10010000</code>
          <code>11011000</code>
        </div>
        <div className="ml-4 flex flex-col justify-center text-4xl">
          <span className="xl:inline-block hidden">⮕</span>
          <span className="xl:hidden inline-block">⬇</span>
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <code>0x0014cc26df080d90d8</code>
        </div>
      </div>
      <p>
        resulting in the public key <code>0x0014cc26df080d90d8</code> for a twelve node graph. Given the graph size for equivalent operational security to modern cryptosystems requires greater than or equal to 2048 vertices, the representative public graph would be serialized as 262016 bytes, or nearly 256kB. Because public keys are not needed by all individuals, we indirectly refer to the relevant public key through its address, produced by hashing the serialized public key. For the sake of future extensibility, we choose the Poseidon hash function.
      </p>
      <p>
        The private key is simply the encoding of the nodes in the clique. In the above example, this would come to a binary string <code>b010011001010</code>, or <code>0x04ca</code>.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Advanced</h2>
      <p>
        Diving in deeper, the way these keypairs are generated follows the algorithm described in <a href="https://ceur-ws.org/Vol-2046/hudoba.pdf">Hud16</a>:
      </p>
      <div className="p-6 my-6 block rounded-xl dark:bg-white/10 bg-pink-50 drop-shadow-xl font-['ui-serif']">
        <div>Parameters:</div>
        <ul className="list-disc pl-6">
          <li><i>n</i> — Graph size</li>
          <li><i>p</i> — Edge probability</li>
          <li><i>k</i> — Planted clique size</li>
          <li><i>p<sub>add</sub></i> — Probability for adding connection</li>
        </ul>
        <div className="pt-6">Key Generation:</div>
        <ol className="list-decimal pl-6">
          <li>Choose a random <i>G</i> ← G(n, p) graph.</li>
          <li>Choose a random <i>k</i>-sized subset <i>S</i> of nodes containing the last row of the adjacency matrix where the last row is the linear combination of <i>k - 1</i> rows.</li>
          <li>Remove all edges between nodes contained in S.</li>
          <li>Iterate through all other nodes <i>u</i> where the count of neighboring nodes in <i>S</i> is odd in random order, and of those:</li>
          <ol className="list-[lower-alpha] pl-6">
            <li>With <i>p<sub>add</sub></i> probability, add an edge to any node <i>v</i> that is in <i>S</i> but not already a neighbor of <i>u</i>.</li>
            <li>if the node was not selected under this probability, remove the existing edge connecting to the node <i>v</i> that is in <i>S</i> and already a neighbor of <i>u</i>.</li>
          </ol>
        </ol>
      </div>
      <p>
        This produces the output values of the adjacency matrix of G, our public key, and S, our private key. Those innately familiar with graph theory would also notice that the private key is actually an anticlique, or independent set, but it can also be thought of as the planted clique of the compliment graph.
      </p>
      <h2 className="text-xl pt-10 pb-4 font-medium">Interactive Example</h2>
      <p>
        To better illustrate this algorithm, click the text between the arrows to see how this mutates an example random graph of G(12, .5). You can click and drag the nodes around to see the relationships:
      </p>
      <BrowserOnly>
        {() => <Simulator/>}
      </BrowserOnly>
    </div>
  </div>;
}

export default Addressing;
