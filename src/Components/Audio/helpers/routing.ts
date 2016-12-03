import AudioNodeBase from '../AudioNodeBase';



type audioNode = AudioNodeBase | AudioNode | AudioParam
/**
 * connect all nodes together in the order supplied
 */
export const connectSeries = (...nodes: audioNode[]) => {
  const len = nodes.length
  if (len > 0) {
    for (let i = 0; i < len - 1; i++) {
      (<AudioNode>nodes[i]).connect(<AudioNode>nodes[i+1]);
    }
  }
  return nodes;
};


/**
 * connect one node to many nodes in parallel
 */
export const connectOneToMany = (firstNode, ...nodes) => {
  const len = nodes.length;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      (<AudioNode>firstNode).connect(<AudioNode>nodes[i]);
    }
  }
  return firstNode;
}

/**
 * connect many nodes to one output in parallel
 */
export const connectManyToOne = (lastNode, ...nodes) => {
  const len = nodes.length;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      (<AudioNode>nodes[i]).connect(<AudioNode>lastNode);
    }
  }
  return lastNode;
}


