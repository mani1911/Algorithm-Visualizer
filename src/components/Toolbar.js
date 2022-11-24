import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import classes from "./board.module.css";

const Toolbar = ({ addNodeHandler, setWeightHandler, startDijkstraAlgo }) => {
  const [wei, setWei] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const changeWeight = () => {
    setWeightHandler(wei);
    setWei("");
  };

  const startDijkstra = (e) => {
    startDijkstraAlgo(start, end);
  };
  return (
    <div className={classes.toolbar}>
      <div className="display-6 text-light border-bottom w-75 mt-3 text-center">
        ToolBar
      </div>
      <Button
        style={{ minWidth: "150px" }}
        onClick={addNodeHandler}
        className={`${classes.addNode} mt-3`}
        variant="success"
      >
        Add Node
      </Button>
      <Button
        style={{ minWidth: "150px" }}
        className={`${classes.addNode} mt-3`}
        variant="danger"
      >
        Delete Node
      </Button>
      <div className={`mt-3 w-50 ${classes.form}`}>
        <Form.Label className={`w-50 text-light`}>Weight :</Form.Label>
        <Form.Control
          onChange={(e) => {
            setWei(e.target.value);
          }}
          onBlur={changeWeight}
          value={wei}
          placeholder="Weight"
          aria-label="Weight"
          aria-describedby="basic-addon1"
        />
        <Form>
          <Form.Label className={`w-50 text-light mt-2`}>Start : </Form.Label>
          <Form.Control
            onChange={(e) => {
              setStart(e.target.value);
            }}
            value={start}
            placeholder="Start Node"
            aria-label="Start Node"
            aria-describedby="basic-addon1"
          />
          <Form.Label className={`w-50 text-light mt-2`}>End : </Form.Label>
          <Form.Control
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            value={end}
            placeholder="End Node"
            aria-label="End Node"
            aria-describedby="basic-addon1"
          />
          <Button
            style={{ minWidth: "100px" }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              startDijkstra();
            }}
            className={`${classes.addNode} mt-3`}
            variant="primary"
          >
            Visualize
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Toolbar;
