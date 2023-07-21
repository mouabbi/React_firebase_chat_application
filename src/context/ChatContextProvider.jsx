import React, { useReducer } from "react"
import { ChatContext } from "./ChatContext"
import { AuthContext } from "./AuthContext"

const ChatContextProvider=({children})=>{

    const currentUser=React.useContext(AuthContext);
    const INITIAL_STATE={
        chatId:"null",
        user:{}
    }

    const chatReducer=(state,action)=>{

        switch (action.type) {
            case "CHANGE_USER":
                console.log('changed action called')
                return {
                    user:action.payload,
                    chatId:currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                }
            case "REST":
                console.log('rest action called')
                return {
                    user:{},
                    chatId:"null"
                }
        
            default:
                return state 
        }

    }
    const [chat, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{dispatch,data:chat}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;