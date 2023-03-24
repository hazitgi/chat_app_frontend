import React, { Fragment, useState } from "react";
import { userStatus } from "../../../utils/helpers";
import "./ChatHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useSelector } from "react-redux";
import Model from "../../Modal/Modal";
import ChatSerice from "../../../services/chatServices";

const ChatHeader = ({ chat }) => {
  console.log(chat.type, ">>>>>>>>>>>>>");
  const socket = useSelector((state) => state.chatReducer.socket);

  const [ShowChatOptions, setShowChatOptions] = useState(false);
  const [ShowAddFriendModal, setShowAddFriendModal] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  const searchFriends = (e) => {
    // chat service
    ChatSerice.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    console.log(id, "addNewFriend");
    // dispatch
    ChatSerice.addFriendToGroupChat(id, chat.id)
      .then((data) => {
        console.log(data, "data after adding to chat");
        // emit
        socket.emit("add-user-to-group", data);
        setShowAddFriendModal(false);
        setShowChatOptions(false);
      })
      .catch((err) => console.log(err));
  };

  const leaveChat = () => {
    ChatSerice.leaveCurrentChat(chat.id)
      .then((data) => {
        socket.emit("leave-current-chat", data);
        setShowChatOptions(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteChat = () => {
    alert("delete chat")
    ChatSerice.deleteCurrentChat(chat.id)
      .then((data) => {
        console.log({ data: data.data });
        socket.emit("delete-chat", data);
        setShowChatOptions(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        onClick={() => setShowChatOptions(!ShowChatOptions)}
        icon={["fas", "ellipsis-v"]}
        className="fa-icon"
      />
      {ShowChatOptions ? (
        <div id="settings">
          <div onClick={() => setShowAddFriendModal(true)}>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>
          {chat.type === "group" ? (
            <div onClick={() => leaveChat()}>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave chat</p>
            </div>
          ) : null}
          {chat.type === "dual" ? (
            <div onClick={() => deleteChat()}>
              <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
              <p>Delete chat</p>
            </div>
          ) : null}
        </div>
      ) : null}
      {ShowAddFriendModal && (
        <Model click={() => setShowAddFriendModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Add friend to gorup chat</h3>
          </Fragment>
          <Fragment key="body">
            <p>Find friends by typing their name below</p>
            <input
              type="text"
              placeholder="Search..."
              onInput={(e) => searchFriends(e)}
            />
            <div id="suggestions">
              {suggestions.map((user) => (
                <div key={user.id} className="suggestion">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <button onClick={() => addNewFriend(user.id)}>Add</button>
                </div>
              ))}
            </div>
          </Fragment>
        </Model>
      )}
    </Fragment>
  );
};

export default ChatHeader;
