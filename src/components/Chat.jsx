import React, { useContext, useEffect } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import logo from "../img/logo.png"
import "./ChatStyle.css"
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const chatContext= React.useContext(ChatContext);

  useEffect(()=>{

  })

  return (
    chatContext.data.user.name?
    (
      <div className="chat">
        <div className="chatInfo">
          <span>{chatContext.data.user.name}</span>
          <div className="chatIcons">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
          </div>
        </div>
        <Messages/>
        <Input/>
      </div>
    ):(
      <div className="chat">
        <div className="home_default">
          <img src={logo} alt="" />
          <p>chose a coversation from the left </p>
        </div>
      </div>
    )
    
  );
};

export default Chat;
