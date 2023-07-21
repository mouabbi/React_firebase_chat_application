import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Navbar = () => {

  const currentUser= React.useContext(AuthContext);
  const chat =React.useContext(ChatContext);

  const handleHome=()=>{
    let action = {
      type:'REST',
      payload:{}
    }
    chat.dispatch(action)
  }
  return (
    <div className='navbar' onClick={handleHome}>
      <span className="logo" style={{cursor:"pointer"}}>Tisfoulla Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <button onClick={()=>{signOut(auth)}}>logout</button>
      </div>
    </div>
  )
}

export default Navbar