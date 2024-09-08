import { createContext, useContext, useState } from "react";

// create context
export const AuthContext = createContext()

//create hook for sharing the context on other components
export const useAuth = () => useContext(AuthContext)
//share the context with other components

export default function AuthProvider ({children}){

    // share the state with other components
    
    const [isAuthenticated , setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    
    function login(username, password){
        if(username==="sreeja" && password==="dummy"){
            setAuthenticated(true)
            setUsername(username)
            return true
        }
        else{
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,setAuthenticated,login,logout,username}}> 
            {children}
        </AuthContext.Provider>
    )
}