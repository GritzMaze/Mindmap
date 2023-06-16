import React, { useState } from 'react';
import Graph from './Graph';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeName, setNodeName] = useState('');
  const [nodeColor, setNodeColor] = useState('#000000');
  const [nodeShape, setNodeShape] = useState('circle');
  const [edgeStartNodeId, setEdgeStartNodeId] = useState('');
  const [edgeEndNodeId, setEdgeEndNodeId] = useState('');
  const [edgeDeleteNodeId, setEdgeDeleteNodeId] = useState('');

  const handleAddNode = () => {
    if (nodeName) {
      const newNodeId = nodes.length > 0 ? nodes[nodes.length - 1].id + 1 : 1; // Calculate the new node ID
      const newNode = {
        id: newNodeId,
        label: nodeName,
        color: nodeColor,
        shape: nodeShape,
      };
      setNodes(prevNodes => [...prevNodes, newNode]);
      setNodeName('');
    }
  };

  const handleAddEdge = () => {
    if (edgeStartNodeId && edgeEndNodeId) {
      // Check if start and end node IDs exist in the current nodes
      const startNode = nodes.find(node => node.id === parseInt(edgeStartNodeId));
      const endNode = nodes.find(node => node.id === parseInt(edgeEndNodeId));

      if (startNode && endNode) {
        const newEdge = { startNodeId: startNode.id, endNodeId: endNode.id };
        setEdges(prevEdges => [...prevEdges, newEdge]);
      }

      setEdgeStartNodeId('');
      setEdgeEndNodeId('');
    }
  };

  const handleDeleteEdge = () => {
    if (edgeDeleteNodeId) {
      let node = nodes.filter(node => node.id !== parseInt(edgeDeleteNodeId));
      let edge = edges.filter(
        (edge) => edge.startNodeId !== edgeDeleteNodeId && edge.endNodeId !== edgeDeleteNodeId
      );
      if (!node) node = [];
      if (!edge) edge = [];
      setNodes(node);
      setEdges(edge);
      setEdgeDeleteNodeId('');
    }
  };

  return (
    <div>
      <div>
        <h3>Add Node</h3>
        <input
          type="text"
          placeholder="Node Name"
          value={nodeName}
          onChange={e => setNodeName(e.target.value)}
        />
        <input
          type="color"
          value={nodeColor}
          onChange={e => setNodeColor(e.target.value)}
        />
        <select
          value={nodeShape}
          onChange={e => setNodeShape(e.target.value)}
        >
          <option value="circle">Circle</option>
          <option value="square">Square</option>
        </select>
        <button onClick={handleAddNode}>Add Node</button>
      </div>
      <div>
        <h3>Add Edge</h3>
        <select
          value={edgeStartNodeId}
          onChange={e => setEdgeStartNodeId(e.target.value)}
        >
          <option value="">Select Start Node</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.label}
            </option>
          ))}
        </select>
        <select
          value={edgeEndNodeId}
          onChange={e => setEdgeEndNodeId(e.target.value)}
        >
          <option value="">Select End Node</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.label}
            </option>
          ))}
        </select>
        <button onClick={handleAddEdge}>Add Edge</button>
      </div>
      <div>
        <h3>Delete Edge</h3>
        <select
          value={edgeStartNodeId}
          onChange={e => setEdgeDeleteNodeId(e.target.value)}
        >
          <option value="">Select Node</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.label}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteEdge}>Delete Edge</button>
      </div>
      <div>
        <h3>Graph</h3>
        <Graph nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}

export default App;