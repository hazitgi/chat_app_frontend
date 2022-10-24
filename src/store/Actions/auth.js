import AuthService from "../../services/authService";
import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "../types";

export const login = (params, navigate) => (dispath) => {
  return AuthService.login(params)
    .then((data) => {
      console.log(data);
      dispath({ type: LOGIN, payload: data });
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const register = (params, navigate) => (dispath) => {
  return AuthService.register(params)
    .then((data) => {
      console.log(data);
      dispath({ type: REGISTER, payload: data });
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const logout = () => (dispath) => {
  AuthService.logout();
  dispath({ type: LOGOUT });
};
export const updateProfile = (params) => (dispath) => {
  return AuthService.updateProfile(params)
    .then((data) => {
      dispath({ type: UPDATE_PROFILE, payload: data });
      return data;
    })
    .catch((error) => {
      console.log(error, "error in update profile action");
      throw error;
    });
};
