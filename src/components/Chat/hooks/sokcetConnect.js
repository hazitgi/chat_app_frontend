import { useEffect } from "react";
import socketClient from "socket.io-client";
import {
  fetchChats,
  offlineFriend,
  onlineFriend,
  onlineFriends,
} from "../../../store/Actions/chat";

const useSocket = (user, dispatch) => {
  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => {
        const socket = socketClient.connect(`http://127.0.0.1:4000`);

        socket.emit("join", user);
        socket.on("typing", (user) => {
          console.log("Event", user);
        });
        socket.on("friends", (friends) => {
          console.log("friends", friends);
          dispatch(onlineFriends(friends));
        });
        socket.on("online", (user) => {
          console.log("online", user);
          dispatch(onlineFriend(user));
        });
        socket.on("offline", (user) => {
          console.log("offline", user);
          dispatch(offlineFriend(user));
        });

        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
};

export default useSocket;
