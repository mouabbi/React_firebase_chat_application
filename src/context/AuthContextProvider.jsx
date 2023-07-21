import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {AuthContext} from "./AuthContext";

const AuthContextProvider=({children})=>{
    const [currUser, setCurrUser] = useState({});

    useEffect(()=>{
       const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrUser(user);
        },(err)=>{
            console.log(err);
        })
        return()=>{
            unsub();
        } 
    })
    
    return(
        <AuthContext.Provider value={currUser}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;