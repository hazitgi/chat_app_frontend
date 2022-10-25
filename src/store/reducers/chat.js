import {
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  FRIENDS_ONLINE,
  FRIEND_OFFLINE,
  FRIEND_ONLINE,
} from "../Actions/chat";

const initialState = {
  chats: [],
  currentChat: {},
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: payload,
      };
    case FRIENDS_ONLINE:
      return {
      //  const chatsCopy = state.chats.map()
      };
    default:
      return state;
  }
};
export default chatReducer;
