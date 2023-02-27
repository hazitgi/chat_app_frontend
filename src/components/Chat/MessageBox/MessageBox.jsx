import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "../Message/Message";
import "./MessageBox.scss";
let i = 0;
const MessageBox = ({ chat }) => {
  console.log("renderingMessageBox MessageBoxMessageBox MessageBox", i);
  i++;

  const user = useSelector((state) => state.authReducer.user);

  const scrolBottom = useSelector((state) => state.chatReducer.scrolBottom);
  const msgBox = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBox.current.scrolHeight);
    }, 100);
  }, [scrolBottom]);

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value;
  };
  return (
    <div id="msg-box" ref={msgBox}>
      {chat.Messages.map((message, index) => {
        return (
          <Message
            user={user}
            chat={chat}
            message={message}
            index={index}
            key={message.id}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
