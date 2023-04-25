import './App.css';
import React, { useEffect } from 'react';

function App() {
  
  

  useEffect(() => {
    const getCtx = () => {
      return ctx;
    }
    
    
    function canvas_arrow(context:any, fromx:any, fromy:any, tox:number, toy:number) {
        var headlen = 20; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    }

    let nodes = [
        {"name": "First", "value": 5, "location": [75, 75]}, 
        {"name": "Second", "value": 12, "location": [400, 75]}, 
        {"name": "Third", "value": 25, "location": [200, 350]},
        {"name": "Forth", "value": 40, "location": [700, 500]},
        {"name": "Mihi", "value": 40, "location": [650, 250]},
        {"name": "Gosho", "value": 40, "location": [450, 600]},
    ];
    let edges = [
        [0, 1], 
        [1, 2], 
        [2, 0],
        [0, 3],
        [3, 0],
        [1, 4],
        [5, 1],
        [2, 5],
        [3, 2],
        [4, 5],
        [5, 4],
    ];

    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                  html.clientHeight, html.scrollHeight, html.offsetHeight );


    var width = Math.max( body.scrollWidth, body.offsetWidth, 
                  html.clientWidth, html.scrollWidth, html.offsetWidth );


    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    

    
    canvas.width = width;
    canvas.height = height;
      // canvas.width = ;
      // canvas.height = ;
    var ctx = canvas.getContext("2d");







    edges.forEach((egde) => {
        const beginNode = nodes[egde[0]];
        let beginNodeX = beginNode['location'][0];
        let beginNodeY = beginNode['location'][1];
        const endNode = nodes[egde[1]];
        let endNodeX = endNode['location'][0];
        let endNodeY = endNode['location'][1];

        if (beginNodeX === endNodeX) {
            if (beginNodeY < endNodeY) {
                beginNodeY += 50;
                endNodeY -= 50;
            } else {
                beginNodeY -= 50;
                endNodeY += 50;
            }
        } else if (beginNodeY === endNodeY) {
            if (beginNodeX < endNodeX) {
                beginNodeX += 50;
                endNodeX -= 50;
            } else {
                beginNodeX -= 50;
                endNodeX += 50;
            }
        } else {
            let bigX = Math.abs(beginNodeX - endNodeX);
            let bigY = Math.abs(beginNodeY - endNodeY);
            let bigZ = Math.sqrt(bigX * bigX + bigY * bigY);
            console.log(bigX, bigY, bigZ);

          

            let Aangle = Math.asin(bigX / bigZ);// / Math.PI * 180;
            console.log(Aangle / Math.PI * 180);

            let x = 50 * Math.cos(Aangle - 1.57079633)
            let y = - 50 * Math.sin(Aangle - 1.57079633)

            console.log(x, y)

            // let Bangle = 1.57079633 - Aangle;

            // let tng = Math.tan(Bangle);
            // console.log(tng)

            // let smallY = 50;

            // let smallX = smallY / tng;
            // console.log(smallX);

            if (beginNodeX > endNodeX && beginNodeY < endNodeY) {
                beginNodeX -= x;
                beginNodeY += y;
                endNodeX += x;
                endNodeY -= y; 
            } else if (beginNodeX < endNodeX && beginNodeY > endNodeY) {
                beginNodeX += x;
                beginNodeY -= y;
                endNodeX -= x;
                endNodeY += y;
            } else if (beginNodeX > endNodeX && beginNodeY > endNodeY) {
                beginNodeX -= x;
                beginNodeY -= y;
                endNodeX += x;
                endNodeY += y; 
            }  else if (beginNodeX < endNodeX && beginNodeY < endNodeY) {
                beginNodeX += x;
                beginNodeY += y;
                endNodeX -= x;
                endNodeY -= y; 
            }
            
            
        }

        canvas_arrow(getCtx(), beginNodeX, beginNodeY, endNodeX, endNodeY);
        // canvas_arrow(getCtx(), beginNode['location'][0], beginNode['location'][1], endNode['location'][0], endNode['location'][1]);
    })
    ctx!.stroke();

    nodes.forEach((node) => {
        ctx!.beginPath();
        ctx!.arc(node['location'][0], node['location'][1], 50, 0, 2 * Math.PI);
        ctx!.font = "14px Arial";
        ctx!.textAlign = "center";
        ctx!.fillText(node['name'], node['location'][0], node['location'][1]);
        ctx!.stroke();
    });
  });


  
  return <div style={{height: '100%'}}>
    <canvas id="canvas"></canvas>
  </div>;
}

export default App;
