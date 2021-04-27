import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { cloneDeep } from "lodash";
import { IconButton } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
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

const EditTodoModal = (props) => {
  const { open, onClose, editTodo } = props;
  const [todo, setTodo] = useState(props.todo);
  const classes = useStyles();

  useEffect(() => {
    setTodo(props.todo);
  }, [open]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!todo.title) {
      return Swal.fire({
        text: "Please add a title",
        icon: "error",
      });
    }

    await editTodo(todo);
    onClose();
  };

  const handleChange = (event) => {
    setTodo((prev) => {
      prev = cloneDeep(prev);
      if (prev) {
        prev.title = event.target.value;
      }
      return prev;
    });
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Edit Todo value</DialogTitle>
      <form onSubmit={onSubmit}>
        <TextField
          name="title"
          type="text"
          placeholder="Todod title..."
          value={todo?.title ?? ""}
          className={classes.textField}
          onChange={handleChange}
        />
        <IconButton className={classes.iconButton} type="submit">
          <AssignmentTurnedInIcon />
        </IconButton>
      </form>
    </Dialog>
  );
};

export default EditTodoModal;
