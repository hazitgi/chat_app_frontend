import AuthService from "../../services/authService";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";

export const login = (params, navigate) => (dispath) => {
  AuthService.login(params)
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
  AuthService.register(params)
    .then((data) => {
      console.log(data);
      dispath({ type: REGISTER, payload: data });
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
