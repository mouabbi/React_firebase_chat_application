import React, { useState } from "react";
import Add from "../img/addAvatar.png";

import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import LoginAnimation from "../components/LoginAnimation";



const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file,setFile]=useState();



  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let name=e.target[0].value;
    let email=e.target[1].value;
    let password=e.target[2].value;

    try{ 
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `avatars/${name}.jpg`);
      const metadata = { contentType: file.type,};
      const blob = new Blob([file], { type: file.type }) 
      uploadBytes(storageRef, blob,metadata)
       .then((snapshot) => {
          getDownloadURL(snapshot.ref)
          .then(async (downloadURL) => {
            await updateProfile(res.user,{displayName:name,photoURL:downloadURL});
            await setDoc(doc(db, "users", res.user.uid), {
              uid:res.user.uid,
              name,
              email ,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoading(false);

            // redirect to home :
            navigate('/');
          });
        });
      
    }
    catch(error){ 
      console.log(error)
      setLoading(false);
      setErr(true);
    };

  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Tisfoulla Chat</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input  style={{ display: "none" }} 
                  type="file" 
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])} 
                  />

          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>

          <div className="loading"> {loading && (<LoginAnimation/>)} </div>

          <button disabled={loading}>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account?<Link to="/login">Login</Link> 
        </p>
      </div>
    </div>
  );
};

export default Register;
