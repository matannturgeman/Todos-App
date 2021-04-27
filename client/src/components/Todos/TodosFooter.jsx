import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    float: "left",
    width: "33.33%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const TodosFooter = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.div}>
      <p className={classes.tab}>
        {props.totalTasks} {props.totalTasks === 1 ? "task" : "tasks"}
      </p>
      <p className={classes.tab}>{props.doneTasks} complete</p>
      <p className={classes.tab}>{props.totalTasks - props.doneTasks} open</p>
    </Paper>
  );
};

export default TodosFooter;
