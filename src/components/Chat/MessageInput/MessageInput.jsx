import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MessageInput.scss";
import { useSelector } from "react-redux";
import ChatService from "../../../services/chatServices";

import data from "@emoji-mart/data";
// import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
import Picker from "@emoji-mart/react";
import "./MessageInput.scss";

// new Picker({
// new Picker({ data });
const MessageInput = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);

  const fileUpload = useRef();
  const msgInput = useRef();

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    const receiver = {
      chatId: chat.id,
      formUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    }

    if (value.length === 0) {
      receiver.typing = false;
      socket.emit("typing", receiver);
    }

    // notify other user that this user is typing some thing
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") sendMessage(imageUpload);
  };
  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setImage("");

    // send message with socket

    socket.emit("message", msg);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);

    // service
    ChatService.uploadImage(formData)
      .then((image) => {
        console.log(image, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        sendMessage(image.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectEmoji = (emoji) => {
    console.log("working select Emoji func");
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;

    console.log("value from slectEmoji", value);

    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus();
    msgInput.current.selectionEnd = endPosition + emojiLength;
  };

  return (
    <div id="input-container">
      <div id="image-upload-container">
        <div></div>
        <div id="image-upload">
          {image?.name ? (
            <div id="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                icon="upload"
                className="fa-icon"
                onClick={handleImageUpload}
              />
              <FontAwesomeIcon
                icon="times"
                className="fa-icon"
                onClick={() => setImage(null)}
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            icon={["far", "image"]}
            className="fa-icon"
            onClick={() => fileUpload.current.click()}
          />
        </div>
      </div>
      <div id="message-input">
        <input
          ref={msgInput}
          value={message}
          type="text"
          placeholder="Message..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          icon={["far", "smile"]}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="fa-icon"
        />
      </div>
      <input
        type="file"
        name=""
        id="chat-image"
        ref={fileUpload}
        onChange={(e) => setImage(e.target.files[0])}
      />
      {showEmojiPicker ? (
        <Picker
          data={data}
          title="Pick your emoji...."
          emoji="point_up"
          // style={{position: "absolute", bottom: "0px", right: "20px", backgroundColor:"red" }}
          onEmojiSelect={selectEmoji}
        />
      ) : null}
    </div>
  );
};

export default MessageInput;
