import API from "./api";

const ChatSerice = {
  fetchChats: () => {
    return API.get("/chats")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  uploadImage: (data) => {
    const headers = {
      // "Content-Type": `multipart/form-data`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    return API.post("/chats/upload-image", data, headers);
  },
  paginateMessages: (id, page) => {
    return API.get("/chats/messages", {
      params: {
        id,
        page,
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  searchUsers: (term) => {
    return API.get("/users/search-users", {
      params: {
        term,
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  createChat: (partnerId) => {
    return API.post("/chats/create", {
      partnerId,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default ChatSerice;
