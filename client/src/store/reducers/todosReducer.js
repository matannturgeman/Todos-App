import {
  TODOS_REQUSET_ERROR,
  TODOS_REQUSET_LOADING,
  TODOS_REQUSET_SUCCESS,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from "../constants/todosConstants";

const initialState = { todos: [], isLoading: false, error: null };

export default function todosReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TODOS_REQUSET_LOADING: {
      return { ...state, isLoading: true, error: null };
    }
    case TODOS_REQUSET_SUCCESS: {
      return { ...state, isLoading: false, todos: payload.todos };
    }
    case TODOS_REQUSET_ERROR: {
      return { ...state, isLoading: false, error: action.error };
    }
    case ADD_TODO: {
      const newTodos = [payload.todo, ...state.todos];
      return { ...state, todos: newTodos };
    }
    case DELETE_TODO: {
      const newTodos = state.todos.filter(
        (todo) => todo.id !== payload.todo.id
      );
      return { ...state, todos: newTodos };
    }
    case EDIT_TODO: {
      const newTodos = state.todos.map((t) => {
        if (t.id === payload.todo.id) {
          t = payload.todo;
        }
        return t;
      });
      return { ...state, todos: newTodos };
    }
    default: {
      return state;
    }
  }
}
