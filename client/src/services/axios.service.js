import axios from "axios";
import localStorageService from "./localStorage.service";

const send = async ({ method = "get", url, data, ...restOptions }) => {
  try {
    method = method.toLowerCase();
    const response = await axios({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorageService.getToken(),
      },
      ...restOptions,
    });
    return response;
  } catch (err) {
    throw new Error(err.response?.data ?? err?.message ?? "Request Faild");
  }
};

export default {
  send,
};
