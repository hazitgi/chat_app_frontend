import ChatSerice from "../../services/chatServices";

export const FETCH_CHATS = "FETCH_CHATS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";

export const fetchChats = () => (dispatch) => {
  return ChatSerice.fetchChats()
    .then((data) => {
      data.forEach((chat) => {
        chat.Users.forEach((user) => {
          user.status = "offline";
        });
        chat.Messages.reverse();
      });
      console.log(data);
      dispatch({ type: FETCH_CHATS, payload: data });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const setCurrentChat = (chat) => (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};