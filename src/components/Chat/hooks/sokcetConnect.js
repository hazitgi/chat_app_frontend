import React, { useEffect } from "react";
import socketClient from "socket.io-client";

const useSocket = (user, dispatch) => {
  const socket = socketClient.connect(`http://127.0.0.1:4000`);

  socket.emit("join", user);
  socket.on("typing", (user) => {
    console.log("Event", user);
  });
  socket.on("friends", (friends) => {
    console.log("friends", friends);
  });
  socket.on("online", (user) => {
    console.log("online", user);
  });
  socket.on("offline", (user) => {
    console.log("offline", user);
  });
  useEffect(() => {}, [dispatch]);
};

export default useSocket;
