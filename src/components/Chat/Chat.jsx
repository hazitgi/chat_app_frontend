import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar/Navbar";
import "./Chat.scss";
import { fetchChats } from "../../store/Actions/chat";
import FriendList from "./FriendList/FriendList";
import Messenger from "./Messenger/Messenger";
import useSocket from "./hooks/sokcetConnect";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  useSocket(user, dispatch);

  // useEffect(() => {
  //   dispatch(fetchChats())
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err, "error in Chat.jsx"));
  // }, [dispatch]);
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <Messenger />
      </div>
    </div>
  );
};

export default Chat;
