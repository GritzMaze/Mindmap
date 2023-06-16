import React, { useState, useEffect, useRef } from 'react';

const NODE_RADIUS = 50;
// const EDGE_LENGTH = 10;



function initializeNodePositions(nodes, width, height) {
  const positions = [];

  // Place nodes randomly
  nodes.forEach(node => {
    const position = {
      id: node.id,
      x: Math.random() * width,
      y: Math.random() * height,
      label: node.label,
      color: node.color || '#000000', // default color is black
      shape: node.shape || 'circle' // default shape is circle

    };
    position.x = Math.max(NODE_RADIUS, Math.min(width - NODE_RADIUS, position.x));
    position.y = Math.max(NODE_RADIUS, Math.min(height - NODE_RADIUS, position.y));
    positions.push(position);
  });
  console.log(positions)

  // // Collision detection
  // const minDistance = NODE_RADIUS * 2;
  // let hasOverlap = true;
  // while (hasOverlap) {
  //   hasOverlap = false;

  //   for (let i = 0; i < positions.length; i++) {
  //     for (let j = i + 1; j < positions.length; j++) {
  //       const dx = positions[i].x - positions[j].x;
  //       const dy = positions[i].y - positions[j].y;
  //       const distance = Math.sqrt(dx * dx + dy * dy);
  //       console.log(nodes[i].x, nodes[i].y)
  //       console.log(distance)
  //       if (distance < minDistance) {
  //         // Nodes are overlapping, move them away from each other
  //         hasOverlap = true;
  //         const angle = Math.atan2(dy, dx);
  //         positions[i].x += Math.cos(angle) * (minDistance - distance) / 2;
  //         positions[i].y += Math.sin(angle) * (minDistance - distance) / 2;
  //         positions[j].x -= Math.cos(angle) * (minDistance - distance) / 2;
  //         positions[j].y -= Math.sin(angle) * (minDistance - distance) / 2;
  //       }
  //     }
  //   }
  // }

  return positions;
}



// function getForce(distance) {
//   return (EDGE_LENGTH - distance) / EDGE_LENGTH;
// }

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
      // // Run the force-directed layout algorithm
      // for (let i = 0; i < 100; i++) {
      //   nodePositions.forEach((pos1, index1) => {
      //     let fx = 0;
      //     let fy = 0;

      //     nodePositions.forEach((pos2, index2) => {
      //       if (index1 === index2) {
      //         return;
      //       }

      //       const dx = pos2.x - pos1.x;
      //       const dy = pos2.y - pos1.y;
      //       const distance = Math.sqrt(dx * dx + dy * dy);
      //       const angle = Math.atan2(dy, dx);

      //       const force = getForce(distance);
      //       fx += force * Math.cos(angle);
      //       fy += force * Math.sin(angle);
      //     });

      //     const node = nodePositions[index1];
      //     node.x += fx;
      //     node.y += fy;

      //     // Keep the nodes within the canvas boundaries
      //     node.x = Math.max(NODE_RADIUS, Math.min(width - NODE_RADIUS, node.x));
      //     node.y = Math.max(NODE_RADIUS, Math.min(height - NODE_RADIUS, node.y));
      //   });
      // }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the nodes
      nodePositions.forEach(node => {
        ctx.beginPath();

        ctx.fillStyle = '#ffffff'; // set fill color before stroke color
        ctx.strokeStyle = node.color || '#000000'; // set stroke color after fill color

        ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.font = "14px Arial";
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
      });

      // Draw the edges
      edges.forEach(edge => {
        const startNode = nodes.find(node => node.id === edge.startNodeId);
        const endNode = nodes.find(node => node.id === edge.endNodeId);
        let startNodePos = nodePositions.find(node => node?.id === startNode?.id);
        let endNodePos = nodePositions.find(node => node?.id === endNode?.id);

        if (typeof startNodePos !== 'undefined' && typeof endNodePos !== 'undefined') {
          let a = Math.abs(startNodePos.x - endNodePos.x);
          let b = Math.abs(startNodePos.y - endNodePos.y);
          let c = Math.sqrt(a * a + b * b);
          // console.log(a, b, c);

                
          let alfa = Math.asin(a / c);
          //console.log(alfa / Math.PI * 180);

          let x = 50 * Math.cos(alfa - 1.57079633)
          let y = - 50 * Math.sin(alfa - 1.57079633)

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
          }  else if (beginNodeX <= endNodeX && beginNodeY <= endNodeY) {
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
          ctx.lineTo(endNodeX - headlen * Math.cos(angle - Math.PI / 6), endNodeY - headlen * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(endNodeX, endNodeY);
          ctx.lineTo(endNodeX - headlen * Math.cos(angle + Math.PI / 6), endNodeY - headlen * Math.sin(angle + Math.PI/ 6));

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
