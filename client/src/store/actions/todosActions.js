import {
  TODOS_REQUSET_ERROR,
  TODOS_REQUSET_LOADING,
  TODOS_REQUSET_SUCCESS,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from "../constants/todosConstants";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  editTodo,
} from "../../services/todos.service";

export const loadTodosAction = () => ({ type: TODOS_REQUSET_LOADING });

export const fetchTodosAction = (filters) => async (dispatch) => {
  try {
    const todos = await fetchTodos(filters);
    dispatch({ type: TODOS_REQUSET_SUCCESS, payload: { todos } });
  } catch (e) {
    dispatch({ type: TODOS_REQUSET_ERROR, error: e.message });
  }
};

export const addTodoAction = (title) => async (dispatch) => {
  try {
    const todo = await addTodo(title);
    dispatch({ type: ADD_TODO, payload: { todo } });
  } catch (e) {}
};

export const deleteTodoAction = (id) => async (dispatch) => {
  try {
    const todo = await deleteTodo(id);
    dispatch({ type: DELETE_TODO, payload: { todo } });
  } catch (e) {}
};

export const markDoneTodoAction = (todo) => async (dispatch) => {
  try {
    const data = { todoId: todo.id, done: todo.done };
    const editedTodo = await editTodo(data);
    dispatch({ type: EDIT_TODO, payload: { todo: editedTodo } });
  } catch (e) {}
};

export const editTodoAction = (todo) => async (dispatch) => {
  try {
    const data = { todoId: todo.id, title: todo.title };
    const editedTodo = await editTodo(data);
    dispatch({ type: EDIT_TODO, payload: { todo: editedTodo } });
  } catch (e) {}
};
