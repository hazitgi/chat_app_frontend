import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MessageInput.scss";
import { useSelector } from "react-redux";

const MessageInput = ({ chat }) => {
  const [message, setMessage] = useState("");
  const [Image, setImage] = useState("");
  const user = useSelector((state) => state.authReducer.user);

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    // notify other user that this user is typing some thing
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "enter") sendMessage(imageUpload);

    const sendMessage = (imageUpload) => {
      if (message.length < 1 && !imageUpload) return;

      const msg = {
        type: imageUpload ? "image" : "text",
        formUserId: user.id,
        toUserId: chat.User.map((user) => user.id),
        chatId: chat.id,
        message: imageUpload ? Image : message,
      };

      setMessage("");
      setImage("");

      // send message with socket
    };
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon icon={["far", "smile"]} className="fa-icon" />
      </div>
    </div>
  );
};

export default MessageInput;