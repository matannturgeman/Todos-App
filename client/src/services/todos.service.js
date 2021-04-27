import axiosService from "./axios.service";
import { BASE_TODOS_API } from "../utils/keys";

export const fetchTodos = async (filters) => {
  try {
    const { data } = await axiosService.send({
      url: `${BASE_TODOS_API}/all`,
      params: { filters },
    });
    return data;
  } catch (err) {}
};

export const addTodo = async (title) => {
  try {
    const { data } = await axiosService.send({
      url: BASE_TODOS_API,
      data: { title },
      method: "POST",
    });
    return data;
  } catch (err) {}
};

export const deleteTodo = async (todoId) => {
  try {
    const { data } = await axiosService.send({
      url: BASE_TODOS_API,
      data: { todoId },
      method: "DELETE",
    });
    return data;
  } catch (err) {}
};

export const editTodo = async (todo) => {
  try {
    const { data } = await axiosService.send({
      url: BASE_TODOS_API,
      data: todo,
      method: "PUT",
    });
    return data;
  } catch (err) {}
};
