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
};

export default ChatSerice;
