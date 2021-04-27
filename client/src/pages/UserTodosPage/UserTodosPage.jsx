import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadingSpinner,
  ErrorAlert,
} from "../../components/StateComponents/StateComponents";
import {
  loadTodosAction,
  fetchTodosAction,
  addTodoAction,
  deleteTodoAction,
  markDoneTodoAction,
  editTodoAction,
} from "../../store/actions/todosActions";
import TodosList from "../../components/Todos/TodosList";
import EditTodoModal from "../../components/Todos/EditTodoModal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TodosHeader from "../../components/Todos/TodosHeader";
import "./UserTodosPage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    flexGrow: 1,
  },
  contentCenter: {
    margin: "0 auto",
    marginTop: 20,
  },
  grid: {
    marginTop: theme.spacing(5),
  },
}));

const UserTodosPage = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);
  const [filters, setFilters] = useState("createdDate");
  const classes = useStyles();
  const { loginUser } = useSelector((state) => state.authReducer);
  const { isLoading, todos, error } = useSelector(
    (state) => state.todosReducer
  );
  const dispatch = useDispatch();

  const loadUserTodos = () => {
    dispatch(loadTodosAction());
    dispatch(fetchTodosAction(filters));
  };

  useEffect(() => {
    loadUserTodos();
  }, [filters]);

  const addTodo = (title) => {
    dispatch(addTodoAction(title));
    loadUserTodos();
  };

  const deleteTodo = (id) => {
    dispatch(deleteTodoAction(id));
  };

  const editTodo = (todo) => {
    if (!todo) return;
    dispatch(editTodoAction(todo));
    if (filters === "modifiedDate") loadUserTodos();
  };

  const markDone = (id) => {
    const todo = cloneDeep(todos.find((t) => t.id === id));
    if (!todo) return;
    todo.done = !todo.done;
    dispatch(markDoneTodoAction(todo));
    if (filters === "modifiedDate") loadUserTodos();
  };

  const renderTodoList = () => {
    if (isLoading) {
      return (
        <div className={classes.contentCenter}>
          <LoadingSpinner />
        </div>
      );
    }

    if (!isLoading && error) {
      return (
        <div className={classes.contentCenter}>
          <ErrorAlert error={error} />
        </div>
      );
    }

    return (
      <>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={filters}
            onChange={(e) => setFilters(e.target.value)}
          >
            <FormControlLabel
              value="modifiedDate"
              control={<Radio />}
              label="Modified Date"
            />
            <FormControlLabel
              value="createdDate"
              control={<Radio />}
              label="Created Date"
            />
          </RadioGroup>
        </FormControl>

        <TodosList
          todos={todos}
          addTodo={addTodo}
          openEditModal={(todo) => {
            setOpenEditModal(true);
            setEditedTodo(todo);
          }}
          deleteTodo={deleteTodo}
          markDone={markDone}
        />
        <EditTodoModal
          open={openEditModal}
          todo={editedTodo}
          onClose={() => setOpenEditModal((prev) => !prev)}
          editTodo={editTodo}
        />
      </>
    );
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography gutterBottom component="h2">
        Hello {loginUser?.username || "Guest"}!
      </Typography>

      <TodosHeader />

      {renderTodoList()}
    </Container>
  );
};

export default UserTodosPage;
