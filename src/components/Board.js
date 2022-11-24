import React, { useEffect, useRef, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import classes from "./board.module.css";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, { use } from "cytoscape";
import Toolbar from "./Toolbar";
const Board = () => {
  const [node, setNode] = useState(0);
  const [edge, setEdge] = useState(null);
  const [start, setStart] = useState(false);
  const [startInd, setStartInd] = useState(null);
  const [endInd, setEndInd] = useState(null);
  const [del, setDel] = useState(false);
  let cyRef = useRef(null);
  let weight = useRef(null);
  let nodePair = [];
  let myCyRef = useRef();
  const styles = [
    {
      selector: "node",
      style: {
        color: "black",
        label: "data(id)",
        fontSize: 35,
        width: 50,
        height: 50,
        textHalign: "center",
        textValign: "center",
        backgroundColor: "white",
        borderColor: "cyan",
        borderWidth: "5px",
      },
    },
    {
      selector: "edge",
      style: {
        color: "white",
        fontSize: 35,
        width: 5,
        label: "data(label)",
        lineColor: "cyan",
      },
    },
    {
      selector: ":selected",
      css: {
        "line-color": "yellow",
        backgroundColor: "green",
        borderColor: "yellow",
        "source-arrow-color": "black",
      },
    },
  ];
  const [nodeElements, setNodeElements] = useState([
    // {
    //   data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    // },
  ]);

  const [edgeElements, setEdgeElements] = useState([]);

  const addNodeHandler = () => {
    setNodeElements((eles) => [
      ...eles,
      {
        data: {
          id: node.toString(),
          label: node,
          isEdge: false,
        },
        position: {
          x: 500,
          y: 500,
        },
      },
    ]);

    setNode((node) => node + 1);
  };

  const setWeightHandler = (w) => {
    weight = w;
  };

  const drawEdge = (e, cy) => {
    var node_id = e.target.id();
    nodePair.push(node_id);
    if (nodePair.length == 2 && weight != 0 && weight) {
      cy.add({
        group: "edges",
        data: {
          id: Math.random().toString(),
          source: nodePair[0],
          target: nodePair[1],
          weight: weight,
          label: weight,
          isEdge: true,
        },
      });
      weight = null;
      nodePair = [];
      return;
    }
  };

  const addNode = (e, cy) => {
    let edge = e.target;
    cy.remove(edge);
  };

  const iterateCollections = (eles) => {
    eles.forEach((ele) => {
      if (!ele._private.data.isEdge) console.log(ele[0]._private.data);
    });
  };

  const startDijkstra = (start, end) => {
    setStartInd(start);
    setEndInd(end);
    setStart(true);
  };
  const sleeper = (ms) => {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  };

  const deleteNodeHandler = () => {
    setDel(true);
  };
  return (
    <div className={classes.board}>
      <h1 className={`display-5 mt-3 text-light`}>Algorithm Visualizer</h1>
      <div className={classes.wrapper}>
        <CytoscapeComponent
          cy={(cy) => {
            if (del) {
              if (node > 0) {
                cy.remove(cy.$(`#${node - 1}`));
                console.log("Remoced : ", node - 1);
                setDel(false);
                console.log("All Deleted");
                setNode((nod) => nod - 1);
              }
            }
            iterateCollections(cy.elements());
            if (start) {
              console.log(startInd, endInd);
              var dijkstra = cy
                .elements()
                .dijkstra(`#${startInd}`, function (edge) {
                  console.log(edge.data("label"));
                  return edge.data("label");
                });

              //console.log(dijkstra.pathTo(cy.$("2")));
              //console.log(dijkstra.distanceTo(cy.$("#n5")));
              async function delayedLoop() {
                var p = dijkstra.pathTo(cy.$(`#${endInd}`));
                for (let i = 0; i < p.length; i++) {
                  await sleeper(1000);
                  cy.$("#" + p[i]._private.data.id).select();
                }
              }

              delayedLoop();
              setStart(false);
            }

            cy.on("click", "edge", (e) => addNode(e, cy));
            cy.on("click", "node", (e) => drawEdge(e, cy));
          }}
          className={classes.main}
          stylesheet={styles}
          elements={CytoscapeComponent.normalizeElements({
            nodes: nodeElements,
            edges: edgeElements,
          })}
        />
        ;
        <Toolbar
          startDijkstraAlgo={startDijkstra}
          setWeightHandler={setWeightHandler}
          addNodeHandler={addNodeHandler}
          deleteNodeHandler={deleteNodeHandler}
        />
      </div>
    </div> //comment
  );
};

export default Board;
