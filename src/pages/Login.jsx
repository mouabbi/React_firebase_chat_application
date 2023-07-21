import React, { useState } from "react";
import LoginAnimation from "../components/LoginAnimation";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    let email=e.target[0].value;
    let password=e.target[1].value;

    try{ 
      await signInWithEmailAndPassword(auth,email,password)
      setLoading(false)
      navigate('/')
      
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

        <span className="logo">Tisfoulla Chat </span>
        <span className="title">Login</span>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <div className="loading"> {loading && (<LoginAnimation/>)} </div>
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>

        <p>You don't have an account?<Link to="/register">Register</Link> </p>

      </div>
    </div>
  );
};

export default Login;
