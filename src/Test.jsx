import React from "react";
import { AuthContext } from "./context/AuthContext";

const Test =()=>{
    const cntval= React.useContext(AuthContext);
    
    return(
     <>
     <div>
      value : {cntval} 
     </div>
     </>
    )
   }
   export default Test;
