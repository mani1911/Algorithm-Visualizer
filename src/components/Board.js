import React, { useEffect, useRef, useState } from "react";
import classes from "./board.module.css";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import Toolbar from "./Toolbar";
const Board = () => {
  const [node, setNode] = useState(0);
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
        width: 5,
        lineColor: "cyan",
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
        },
        position: {
          x: 500,
          y: 500,
        },
      },
    ]);
    console.log(node);

    setNode((node) => node + 1);
  };
  return (
    <div className={classes.board}>
      <h1 className={classes.title}>Algorithm Visualizer</h1>
      <div className={classes.wrapper}>
        <CytoscapeComponent
          cy={(cy) => {
            cy.on("click", "node", (e) => {
              var node_id = e.target.id();
              console.log(node_id);
              nodePair.push(node_id);
              if (nodePair.length == 2) {
                cy.add({
                  group: "edges",
                  data: {
                    id: Math.random().toString(),
                    source: nodePair[0],
                    target: nodePair[1],
                    label: 2,
                  },
                });
                nodePair = [];
                return;
              }
            });
          }}
          className={classes.main}
          stylesheet={styles}
          elements={CytoscapeComponent.normalizeElements({
            nodes: nodeElements,
            edges: edgeElements,
          })}
        />
        ;
        <Toolbar addNodeHandler={addNodeHandler} />
      </div>
    </div>
  );
};

export default Board;
