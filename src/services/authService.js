import API from "./api";

const AuthService = {
  login: async (data) => {
    return API.post("/login", data)
      .then(({ data }) => {
        API.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((error) => {
        console.log(`auth service error`, error);
        throw error;
      });
  },
  register: async (data) => {
    return API.post("/register", data)
      .then(({ data }) => {
        API.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((error) => {
        console.log(`auth service error`, error.message);
        console.log(`auth service error`, error.response);
        console.log(`auth service error`, error.response.data);
        throw error;
      });
  },
};

export default AuthService;
