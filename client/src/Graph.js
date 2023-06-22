import React, { useState, useEffect, useRef } from 'react';

const NODE_RADIUS = 50;
// const EDGE_LENGTH = 10;

function initializeNodePositions(nodes, width, height) {
  const positions = [];

  // Place nodes randomly
  nodes.forEach((node) => {
    const position = {
      id: node.id,
      x: node.xPos,
      y: node.yPos,
      label: node.label,
      color: node.color || '#000000', // default color is black
      shape: node.shape || 'circle', // default shape is circle
    };
    position.x = Math.max(
      NODE_RADIUS,
      Math.min(width - NODE_RADIUS, position.x)
    );
    position.y = Math.max(
      NODE_RADIUS,
      Math.min(height - NODE_RADIUS, position.y)
    );
    positions.push(position);
  });
  return positions;
}

function Graph({ nodes, edges }) {
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      // Set up the initial node positions
      const nodePositions = initializeNodePositions(nodes, width, height);
      if (!nodePositions) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the nodes
      nodePositions.forEach((node) => {
        ctx.beginPath();

        ctx.fillStyle = '#ffffff'; // set fill color before stroke color
        ctx.strokeStyle = node.color || '#000000'; // set stroke color after fill color

        ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.font = '14px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
      });

      // Draw the edges
      edges.forEach((edge) => {
        const startNode = nodes.find((node) => node.id === edge.startNodeId);
        const endNode = nodes.find((node) => node.id === edge.endNodeId);
        let startNodePos = nodePositions.find(
          (node) => node?.id === startNode?.id
        );
        let endNodePos = nodePositions.find((node) => node?.id === endNode?.id);

        if (
          typeof startNodePos !== 'undefined' &&
          typeof endNodePos !== 'undefined'
        ) {
          let a = Math.abs(startNodePos.x - endNodePos.x);
          let b = Math.abs(startNodePos.y - endNodePos.y);
          let c = Math.sqrt(a * a + b * b);

          let alfa = Math.asin(a / c);

          let x = 50 * Math.cos(alfa - 1.57079633);
          let y = -50 * Math.sin(alfa - 1.57079633);

          let beginNodeX = startNodePos.x;
          let beginNodeY = startNodePos.y;
          let endNodeX = endNodePos.x;
          let endNodeY = endNodePos.y;

          if (beginNodeX >= endNodeX && beginNodeY <= endNodeY) {
            beginNodeX -= x;
            beginNodeY += y;
            endNodeX += x;
            endNodeY -= y;
          } else if (beginNodeX <= endNodeX && beginNodeY >= endNodeY) {
            beginNodeX += x;
            beginNodeY -= y;
            endNodeX -= x;
            endNodeY += y;
          } else if (beginNodeX >= endNodeX && beginNodeY >= endNodeY) {
            beginNodeX -= x;
            beginNodeY -= y;
            endNodeX += x;
            endNodeY += y;
          } else if (beginNodeX <= endNodeX && beginNodeY <= endNodeY) {
            beginNodeX += x;
            beginNodeY += y;
            endNodeX -= x;
            endNodeY -= y;
          }

          var headlen = 20;
          var dx = endNodeX - beginNodeX;
          var dy = endNodeY - beginNodeY;
          var angle = Math.atan2(dy, dx);
          ctx.moveTo(beginNodeX, beginNodeY);
          ctx.lineTo(endNodeX, endNodeY);
          ctx.lineTo(
            endNodeX - headlen * Math.cos(angle - Math.PI / 6),
            endNodeY - headlen * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(endNodeX, endNodeY);
          ctx.lineTo(
            endNodeX - headlen * Math.cos(angle + Math.PI / 6),
            endNodeY - headlen * Math.sin(angle + Math.PI / 6)
          );

          ctx.stroke();
        }
      });
    }
  }, [nodes, edges, width, height]);

  useEffect(() => {
    // Update the canvas dimensions when the window is resized
    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const style = {
    height: '100%',
    width: '100%',
  };
  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} style={style} />
    </div>
  );
}

export default Graph;
