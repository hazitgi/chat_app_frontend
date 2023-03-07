import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./FriendList.scss";
import Friend from "../Friend/Friend";
import { setCurrentChat } from "../../../store/Actions/chat";
import Model from "../../Modal/Modal";
import ChatSerice from "../../../services/chatServices";

const FriendList = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatReducer.chats);

  const socket = useSelector((state) => state.chatReducer.socket);

  const [showFriendModal, setShowFriendModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  const searchFriends = (e) => {
    // chat service
    ChatSerice.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };

  const addNewFriend = (id) => {
    // dispatch
    ChatSerice.createChat(id)
      .then((chats) => {
        // emit
        console.log(chats);
        socket.emit("add-friend", chats);
        setShowFriendModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="friends">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendModal(true)}>ADD</button>
      </div>
      <hr />
      <div id="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
            );
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
      {showFriendModal && (
        <Model click={() => setShowFriendModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Create new chat </h3>
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
    </div>
  );
};

export default FriendList;
