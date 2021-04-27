import { STORAGE_KEY } from "../utils/keys";

const saveUser = (user) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

const getUser = () => JSON.parse(localStorage.getItem(STORAGE_KEY));

const getToken = () => JSON.parse(localStorage.getItem(STORAGE_KEY))?.token;

export default {
  saveUser,
  getUser,
  getToken,
};
