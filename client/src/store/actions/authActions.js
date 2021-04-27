import {
  LOAD_USER_FROM_TOKEN,
  CLEAR_PREVIOUS_USER,
  SET_LOGIN_USER,
} from "../constants/usersConstants";
import { fetchLoginUser } from "../../services/user.service";

export const loadUserFromTokenAction = () => async (dispatch) => {
  let loginUser;
  try {
    loginUser = await fetchLoginUser();
  } catch (err) {
    loginUser = null;
  }
  return dispatch({
    type: LOAD_USER_FROM_TOKEN,
    loginUser,
  });
};

export const setLoginUserAction = (loginUser) => ({ type: SET_LOGIN_USER, loginUser });

export const clearPreviousLogedUser = () => ({ type: CLEAR_PREVIOUS_USER });
