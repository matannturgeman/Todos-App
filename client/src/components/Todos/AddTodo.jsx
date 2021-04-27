import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  iconButton: {
    color: "green",
  },
}));

const AddTodo = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      return Swal.fire({
        text: "Please add a task description.",
        icon: "error",
      });
    }

    props.addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="task-title"
        type="text"
        placeholder="Add task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={classes.textField}
      />
      <IconButton className={classes.iconButton} type="submit">
        <AssignmentTurnedInIcon />
      </IconButton>
    </form>
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
