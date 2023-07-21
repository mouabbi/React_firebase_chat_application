import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const currentUser = React.useContext(AuthContext);
  const chatContext=React.useContext(ChatContext);


  const handleSend = async () => {
    if (img) { 
      const storageRef = ref(storage, `messages/message_${uuid()}.jpg`);
      const metadata = { contentType: img.type,};
      const blob = new Blob([img], { type: img.type }) 
      uploadBytes(storageRef, blob,metadata)
       .then((snapshot) => {
          getDownloadURL(snapshot.ref)
          .then(async (downloadURL) => {

            await updateDoc(doc(db, "chats", chatContext.data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              }),
              
            });
            console.log('msg handeled !!')

          });
        });
    } else { 
      console.log('msg handeled !!')
      await updateDoc(doc(db, "chats", chatContext.data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatContext.data.chatId + ".lastMessage"]: {
        text,
      },
      [chatContext.data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatContext.data.user.uid), {
      [chatContext.data.chatId + ".lastMessage"]: {
        text,
      },
      [chatContext.data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div >
      <form 
        className="input"
        onSubmit={(e)=>{ 
        e.preventDefault();
        handleSend();
        }}>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={{}} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button type="submit">Send</button>
      </div>
      </form>
    </div>
  );
};

export default Input;
