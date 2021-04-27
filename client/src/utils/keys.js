
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const BASE_TODOS_API = `${SERVER_URL}/api/todo`;
export const REGISTER_USER_API = `${SERVER_URL}/api/auth/register`;
export const SIGNIN_USER_API = `${SERVER_URL}/api/auth/signin`;
export const GET_USER_BY_TOEKN_API = `${SERVER_URL}/api/auth/load-user-from-token`;
export const STORAGE_KEY = `HAREL_USER`;