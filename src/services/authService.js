import API from "./api";

const AuthService = {
  login: async (data) => {
    return API.post("/login", data)
      .then(({ data }) => {
        setHeaderAndStorage(data);
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
        setHeaderAndStorage(data);
        return data;
      })
      .catch((error) => {
        console.log(`auth service error`, error.message);
        console.log(`auth service error`, error.response);
        console.log(`auth service error`, error.response.data);
        throw error;
      });
  },
  logout: () => {
    API.defaults.headers["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  updateProfile: async (data) => {
    const config = {
      // "Content-Type": `multipart/form-data`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    return API.post("/users/update", data, config)
      .then((result) => {
        const { data } = result;
        localStorage.setItem("user", JSON.stringify(data));
        return result;
      })
      .catch((error) => {
        console.log(`update profile error`, error.message);
        throw error;
      });
  },
};

const setHeaderAndStorage = ({ user, token }) => {
  API.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export default AuthService;
