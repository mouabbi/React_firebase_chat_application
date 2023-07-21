import React, {  useEffect, useState } from "react";
import Message from './Message'
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const chatContext=React.useContext(ChatContext);

  useEffect(() => {
    const unsub= onSnapshot(doc(db,"chats",chatContext.data.chatId),(doc)=>{
      setMessages(doc.data().messages);
      console.log('messages fetched');
    })
    return ()=>{
      unsub();
    }
  }, [chatContext.data]);

  console.log(messages)

  return (
    <div className="messages">
      {
        messages.map((m,id)=>(
          <Message message={m} key={id}/>
        ))
      }
      
    </div>
  );
};

export default Messages;
