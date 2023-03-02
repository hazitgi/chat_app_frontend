import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paginateMessages } from "../../../store/Actions/chat";
import Message from "../Message/Message";
import "./MessageBox.scss";
const MessageBox = ({ chat }) => {
  console.log("renderingMessageBox MessageBoxMessageBox MessageBox");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);
  const msgBox = useRef();

  const [loading, setLoading] = useState(false);
  const [scrollUp, setScrollUp] = useState(0);

  useEffect(() => {
    if (!senderTyping.typing) {
      setTimeout(() => {
        scrollManual(msgBox.current.scrollHeight);
      }, 100);
    }
  }, [scrollBottom]);

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value;
  };

  const handleInfinitScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLoading(true);
      const pagination = chat.Pagination;
      const page = typeof pagination === "undefined" ? 1 : pagination.page;

      // dispatch
      dispatch(paginateMessages(chat.id, parseInt(page) + 1))
        .then((res) => {
          if (res) {
            setScrollUp(scrollUp + 1);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    scrollManual(Math.ceil(msgBox.current.scrollHeight * 0.1));
  }, [scrollUp]);

  console.log("msgBox.current.scrolHeight", msgBox?.current?.scrolHeight);
  return (
    <div id="msg-box" ref={msgBox} onScroll={handleInfinitScroll}>
      {loading ? (
        <p className="loader m-0">
          <FontAwesomeIcon icon="spinner" className="fa-spin" />
        </p>
      ) : null}
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
      {senderTyping?.typing && senderTyping.chatId === chat.id ? (
        <div className="message">
          <div className="other-person">
            <p className="m-0">
              {senderTyping?.formUser?.firstName}{" "}
              {senderTyping?.formUser?.lastName} typing...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MessageBox;
