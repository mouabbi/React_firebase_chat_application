import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import React from "react";
import  {AuthContext}  from "./context/AuthContext";

function App() {

  const currentUser=React.useContext(AuthContext);

  console.log(currentUser);

  const ProtectedRoute=({children})=>{
    if (!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>} 
         />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
