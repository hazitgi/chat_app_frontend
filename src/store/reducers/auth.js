import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "../types";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || "",
  isLogged: !!localStorage.getItem("user"),
  // user: {},
  // token: "",
  // isLogged: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLogged: true,
      };
    case REGISTER:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLogged: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: "",
        isLogged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
