import localStorageService from "./localStorage.service";
import axiosService from "./axios.service";
import {
  GET_USER_BY_TOEKN_API,
  REGISTER_USER_API,
  SIGNIN_USER_API,
} from "../utils/keys";

export const fetchLoginUser = async () => {
  try {
    const token = localStorageService.getToken();
    const { data } = await axiosService.send({
      url: GET_USER_BY_TOEKN_API,
      params: { token },
    });
    return data;
  } catch (err) {}
};

export const registerUser = async (userData) => {
  const { data } = await axiosService.send({
    method: "post",
    url: REGISTER_USER_API,
    data: userData,
  });
  return data;
};

export const signInUser = async (data) =>
  axiosService.send({
    method: "post",
    url: SIGNIN_USER_API,
    data,
  });
