import React, { useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const currentUser = React.useContext(AuthContext);
  const chatContext=React.useContext(ChatContext);
  const [err, setErr] = useState(false);


  const handleSearch = async () => {
    setUser("");
    const q= query(collection(db,"users"),where("name","==",username));
    try {
      const snapshots=await getDocs(q);

      snapshots.forEach((doc)=>{
        console.log(doc.data());
        setUser(doc.data())
      })
    } catch (error) {
      console.log(error)
      setErr(true);
    }
  };

  const handleKey = (e) => {
    handleSearch();
  };

  const handleSelect = async () => {
    console.log('clicked');
   //check whether the group(chats in firestore) exists, if not create
   const combinedId =
   currentUser.uid > user.uid
     ? currentUser.uid + user.uid
     : user.uid + currentUser.uid;
    
     console.log("comID: "+combinedId);

     try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log('not exists');
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
       console.log('userCHats created !')

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log('userCHats created !')
        
        let action ={
          type:"CHANGE_USER",
          payload:{
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          }
        }
        chatContext.dispatch(action);
        
      }
      else{
        console.log('exists ');
      }
    } catch (error) {
      setErr(err)
      console.log(error);
    }


    setUser("");
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          value={username}
          placeholder="Find a user"
          onKeyUp={handleKey}
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>
      

      {user && (<div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.name}</span>
        </div>
      </div>)}

      
    </div>
  );
};

export default Search;
