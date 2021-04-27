import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import clsx from "clsx";
import "./todoItem.css";

const useStyles = makeStyles((theme) => ({
  li: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  liContent: {
    display: "flex",
  },
  todoDone: {
    textDecoration: "line-through",
  },
  todoNotDone: {
    textDecoration: "none",
  },
  span: {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
}));

const TodoItem = (props) => {
  const { openEditModal } = props;
  const classes = useStyles();
  let liClassName = clsx(
    classes.li,
    props.todo.done ? classes.todoDone : classes.todoNotDone
  );
  return (
    <li className={liClassName}>
      <div className={classes.liContent}>
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              checked={props.todo.done}
              value={props.todo.done}
              onChange={() => props.markDone(props.todo.id)}
              name={props.todo.id}
            />
          }
        />
        <span
          className={classes.span}
          onClick={() => openEditModal(props.todo)}
        >
          {props.todo.title}
        </span>
      </div>
      <IconButton
        onClick={() => props.deleteTodo(props.todo.id)}
        ria-label="delete"
        color="secondary"
        type="submit"
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

export default TodoItem;
