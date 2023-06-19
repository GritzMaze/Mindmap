import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import { mindmapService } from './services/mindmap.service';
import { nodeService } from './services/node.service';
import { connectionService } from './services/connection.service';

function App() {
  const [mindmap, setMindmap] = useState({});
  const [mindmaps, setMindmaps] = useState([]);
  const [mindmapName, setMindmapName] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeName, setNodeName] = useState('');
  const [nodeColor, setNodeColor] = useState('#000000');
  const [nodeShape, setNodeShape] = useState('circle');
  const [edgeStartNodeId, setEdgeStartNodeId] = useState('');
  const [edgeEndNodeId, setEdgeEndNodeId] = useState('');
  const [nodeEditId, setNodeEditId] = useState('');
  const [edgeDeleteNodeId, setEdgeDeleteNodeId] = useState('');
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  useEffect(() => {
  mindmapService.getMindmaps()
    .then(mindmaps => {
      setMindmaps(mindmaps);
    });
  }, []);

  useEffect(() => {
    const parsedId = parseInt(nodeEditId);

    if (isNaN(parsedId)) {
      return;
    }

    const nodeEdit = nodes.find(node => node.id === parsedId);
    if (!nodeEdit) {
      return;
    }
    setXPos(nodeEdit.xPos);
    setYPos(nodeEdit.yPos);
  }, [nodeEditId, nodes]);

  const handleSelectedMindmap = (id) => {
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      setMindmap({});
      setNodes([]);
      setEdges([]);
      return;
    }

    const selectedMindmap = mindmaps.find(mindmap => mindmap.id === parsedId);
    if (!selectedMindmap) {
      return;
    }

    setMindmap(selectedMindmap);
    setNodes(selectedMindmap.nodes);
    const edges = selectedMindmap.connections.map(connection => ({ startNodeId: connection.sourceNodeId, endNodeId: connection.targetNodeId }));
    setEdges(edges);
  }

  const handleCreateMindmap = () => {
    const input = {
      name: mindmapName,
    }
    mindmapService.createMindmap(input)
      .then(newServerMindmap => {
        setMindmaps(prevMindmaps => [...prevMindmaps, newServerMindmap]);
        setMindmap(newServerMindmap);
        setNodes([]);
        setEdges([]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleAddNode = () => {
    if (nodeName) {
      const input = {
        label: nodeName,
        color: nodeColor,
        shape: nodeShape,
        mindmapId: mindmap.id,
        xPos: parseFloat(xPos),
        yPos: parseFloat(yPos),
      }
      nodeService.createNode(input)
      .then(newServerNode => {
      setNodes(prevNodes => [...prevNodes, newServerNode]);
      setNodeName('');
      setXPos(0);
      setYPos(0);
    })
    .catch(error => {
      console.log(error);
    });
    }
  };

  const handleEditNode = () => {
    console.log(nodes, nodeEditId);
    if (nodeEditId) {
      const parsedId = parseInt(nodeEditId);
      if (isNaN(parsedId)) {
        return;
      }
      const nodeEdit = nodes.find(node => node.id === parsedId);
      if (!nodeEdit) {
        return;
      }
      const input = {
        ...nodeEdit,
        label: nodeEdit.label,
        xPos: parseFloat(xPos),
        yPos: parseFloat(yPos),
      }
      nodeService.updateNode(input)
      .then((newServerNode) => {
        const newNodes = nodes.map(node => {
          if (node.id === newServerNode.id) {
            return newServerNode;
          }
          return node;
        });
        setNodes(newNodes);
        setNodeEditId('');
        setXPos(0);
        setYPos(0);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  const handleAddEdge = () => {
    if (edgeStartNodeId && edgeEndNodeId) {
      // Check if start and end node IDs exist in the current nodes
      const startNode = nodes.find(node => node.id === parseInt(edgeStartNodeId));
      const endNode = nodes.find(node => node.id === parseInt(edgeEndNodeId));

      if (startNode && endNode) {
        const input = {
          sourceNodeId: startNode.id,
          targetNodeId: endNode.id,
          mindmapId: mindmap.id,
          label: '',
        }
        connectionService.createConnection(input)
        .then(newServerEdge => {
          const edge = {
            startNodeId: newServerEdge.sourceNodeId,
            endNodeId: newServerEdge.targetNodeId,
          }
          setEdges(prevEdges => [...prevEdges, edge]);
        })
        .catch(error => {
          console.log(error);
        });
      }

      setEdgeStartNodeId('');
      setEdgeEndNodeId('');
    }
  };

  const handleDeleteEdge = async () => {
    if (edgeDeleteNodeId) {
      let node = nodes.filter(node => node.id !== parseInt(edgeDeleteNodeId));
      let edge = edges.filter(
        (edge) => edge.startNodeId !== edgeDeleteNodeId && edge.endNodeId !== edgeDeleteNodeId
      );
      nodeService.deleteNode(edgeDeleteNodeId)
      .catch(error => {
        console.log(error);
      });
      if (!node) node = [];
      if (!edge) edge = [];
      setNodes(node);
      setEdges(edge);
      setEdgeDeleteNodeId('');
    }
  };

  return (
    <div align="center">
      <div>
        <h3>Select Mindmap</h3>
        <select
          placeholder='Select Mindmap'
          value = {mindmap.id}
          onChange={e => handleSelectedMindmap(e.target.value)}
        >
          <option value="">Select Mindmap</option>
          {
            mindmaps.map(mindmap => (
              <option key={mindmap.id} value={mindmap.id}>
                {mindmap.name}
              </option>
          ))}
        </select>
      </div>
      <div>
      <div>
        <h3>Create Mindmap</h3>
        <input
          type="text"
          placeholder="Mindmap Name"
          onChange={e => setMindmapName(e.target.value)}
        />
        <button onClick={handleCreateMindmap}>Create Mindmap</button>
      </div>
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
        <input
          type="number"
          placeholder="X Position"
          value={xPos}
          onChange={e => setXPos(e.target.value)}
        />
        <input
          type="number"
          placeholder="Y Position"
          value={yPos}
          onChange={e => setYPos(e.target.value)}
        />
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
      <h3>Edit node</h3>
        <select
          value={nodeEditId}
          onChange={e => setNodeEditId(e.target.value)}
        >
          <option value="">Select Node</option>
          {nodes.map(node => (
            <option key={node.id} value={node.id}>
              {node.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="X Position"
          value={xPos}
          onChange={e => setXPos(e.target.value)}
        />
        <input
          type="number"
          placeholder="Y Position"
          value={yPos}
          onChange={e => setYPos(e.target.value)}
        />
        <button onClick={handleEditNode}>Edit Node</button>
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