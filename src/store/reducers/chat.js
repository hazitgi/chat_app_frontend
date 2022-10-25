import {
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  FRIENDS_ONLINE,
  FRIEND_OFFLINE,
  FRIEND_ONLINE,
  SET_SOCKET,
  RECEIVED_MESSAGE,
} from "../Actions/chat";

const initialState = {
  chats: [],
  currentChat: {},
  socket: {},
  newMessage: { chatId: null, seen: null },
  scrolBottom: 0,
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
      const chatsCopy = state.chats.map((chat) => {
        return {
          ...chat,
          Users: chat.Users.map((user) => {
            if (payload.includes(user.id)) {
              return {
                ...user,
                status: "online",
              };
            }
            return user;
          }),
        };
      });
      return {
        ...state,
        chats: chatsCopy,
      };

    case FRIEND_ONLINE: {
      let currentChatCopy = { ...state.currentChat };
      const chatsCopy = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === payload.id) {
            return {
              ...user,
              status: "online",
            };
          }
          return user;
        });
        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users,
          };
        }

        return {
          ...chat,
          Users,
        };
      });
      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
      };
    }
    case FRIEND_OFFLINE: {
      let currentChatCopy = { ...state.currentChat };
      const chatsCopy = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === payload.id) {
            return {
              ...user,
              status: "offline",
            };
          }
          return user;
        });
        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users,
          };
        }

        return {
          ...chat,
          Users,
        };
      });
      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
      };
    }
    case SET_SOCKET: {
      return {
        ...state,
        socket: payload,
      };
    }
    case RECEIVED_MESSAGE: {
      const { userId, message } = payload;
      let currentChatCopy = { ...state.currentChat };
      let newMessage = { ...state.newMessage };
      let scrolBottom = state.scrolBottom;

      const chatsCopy = state.chats.map((chat) => {
        if (message.chatId === chat.id) {
          if (message.User.id === userId) {
            scrolBottom++;
          } else {
            newMessage = {
              chatId: chat.id,
              seen: false,
            };
          }
          if (message.chatId === currentChatCopy.id) {
            currentChatCopy = {
              ...currentChatCopy,
              Messages: [...currentChatCopy.Messages, ...[message]],
            };
          }
          return {
            ...chat,
            Messages: [...chat.Messages, ...[message]],
          };
        }
        return chat;
      });

      if (scrolBottom === state.scrolBottom) {
        return {
          ...state,
          chats: chatsCopy,
          currentChat: currentChatCopy,
          newMessage,
        };
      }
      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
        newMessage,
        scrolBottom,
      };
    }
    default:
      return state;
  }
};
export default chatReducer;
