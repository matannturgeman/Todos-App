import {
  LOAD_USER_FROM_TOKEN,
  CLEAR_PREVIOUS_USER,
  SET_LOGIN_USER,
} from "../constants/usersConstants";

import localStorageService from "../../services/localStorage.service";

const initialState = { loginUser: null, isLoading: true };

export default function authReducer(state = initialState, action) {
  const { type, loginUser } = action;
  switch (type) {
    case SET_LOGIN_USER: {
      localStorageService.saveUser(loginUser);
      return {
        ...state,
        loginUser,
        isLoading: false,
      };
    }
    case LOAD_USER_FROM_TOKEN: {
      return {
        ...state,
        loginUser,
        isLoading: false,
      };
    }
    case CLEAR_PREVIOUS_USER: {
      localStorageService.saveUser(null);
      return {
        ...state,
        loginUser: null,
      };
    }
    default: {
      return state;
    }
  }
}
