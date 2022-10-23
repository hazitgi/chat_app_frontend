import { LOGIN, REGISTER } from "../Actions/auth";

const initialState = {
  user: {},
  token: "",
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLogged: true,
      };
    case REGISTER:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLogged: true,
      };
    default:
      return state;
  }
};

export default authReducer;
