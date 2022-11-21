import React from "react";
import Button from "@mui/material/Button";
import classes from "./board.module.css";
const Toolbar = ({ addNodeHandler }) => {
  return (
    <div className={classes.toolbar}>
      <h2>ToolBar</h2>
      <Button
        onClick={addNodeHandler}
        className={classes.addNode}
        variant="contained"
        color="success"
      >
        Add Node
      </Button>
    </div>
  );
};

export default Toolbar;
