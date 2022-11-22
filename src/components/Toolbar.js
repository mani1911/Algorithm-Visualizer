import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import classes from "./board.module.css";
import withStyles from "@mui/material";
const Toolbar = ({ addNodeHandler, setWeightHandler }) => {
  const [wei, setWei] = useState("");

  const changeWeight = () => {
    console.log(wei);
    setWeightHandler(wei);
    setWei("");
  };
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
      <TextField
        onChange={(e) => {
          setWei(e.target.value);
        }}
        onBlur={changeWeight}
        value={wei}
        className={classes.weight}
        id="outlined-basic"
        label="Weight"
        color="success"
        variant="outlined"
      />
    </div>
  );
};

export default Toolbar;
