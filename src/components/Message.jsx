import React, { useEffect, useRef, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const currentUser=React.useContext(AuthContext);
  const chatContext=React.useContext(ChatContext);
  const [msgtime, setmsgtime] = useState("");
  const ref = useRef();

  
  useEffect(()=>{
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const secs=message.date.seconds;
    const msgDate = new Date(secs * 1000);
    setmsgtime(timeSince(msgDate))
  },[message])

  const timeSince=(date)=> {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return "just now";
  }


  return (
    <div
      ref={ref}
      className={`message ${currentUser.uid===message.senderId?"owner":""} `}
    >
      <div className="messageInfo">
        <img
          src={currentUser.uid===message.senderId?
          currentUser.photoURL:
          chatContext.data.user.photoURL
          }
          alt=""
        />
        <span>{msgtime}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      
      </div>
    </div>
  );
};

export default Message;
