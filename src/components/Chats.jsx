import React, {  useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


const Chats = () => {
  const [chats, setChats] = useState([]);
  const currentUser = React.useContext(AuthContext);
  const chatContext = React.useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);


  const selectHandle=(u)=>{
    let action ={
      type:"CHANGE_USER",
      payload:u
    }
    chatContext.dispatch(action);
    console.log("user selected");
    console.log("actual user :"+chatContext.data.user.name)
  }

  return (
    <div className="chats">
     { chats && Object.entries(chats)?.map((chat) => ( 
      <div
        className="userChat"
        onClick={() => selectHandle(chat[1].userInfo)}
        key={chat[0]}
      >
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.name}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
     ))}
    </div>
  );
};

export default Chats;
