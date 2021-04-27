import React from "react";
import AddTodo from "./AddTodo.jsx";
import TodosFooter from "./TodosFooter";
import TodoItem from "./TodoItem";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  todoList: {
    margin: "30px 0",
    height: "29vh",
    overflowY: "auto",
  },
  ul: {
    listStyleType: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 17,
  },
}));

const TodosList = (props) => {
  const { todos, addTodo, deleteTodo, markDone, openEditModal } = props;
  const classes = useStyles();

  const renderTodos = () => {
    const todoLen = todos?.length ?? 0;
    if (todoLen === 0) return <p>No todos found</p>;
    return (
      <div className={classes.todoList}>
        <ul className={classes.ul}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              markDone={markDone}
              deleteTodo={deleteTodo}
              openEditModal={openEditModal}
            />
          ))}
        </ul>
      </div>
    );
  };

  const doneTodosNum = todos?.filter((todo) => todo.done)?.length ?? 0;
  const totalTodosNum = todos?.length ?? 0;

  return (
    <Container maxWidth="sm" className="todo-list-contaner">
      <AddTodo addTodo={addTodo} />
      {renderTodos()}
      <TodosFooter totalTasks={totalTodosNum} doneTasks={doneTodosNum} />
    </Container>
  );
};

export default TodosList;
