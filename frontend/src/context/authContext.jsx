import {createContext, useState, useEffect} from "react"
import axios from "axios"



export const AuthContext = createContext()

export const AuthcontextProvider = ({children})=>{
    const storedUser = localStorage.getItem("user");
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Error parsing stored user:", e);
            return null;
        }
    });


    const login = async (input)=>{
        const res = await axios.post("http://localhost:5000/api/v1/auth/login", input, {
            withCredentials: true, // Ensure cookies are sent with the request
        })

        setCurrentUser(res.data)
    }

    const logout = async () => {
        await axios.post("http://localhost:5000/api/v1/auth/logout", {}, {
            withCredentials: true
        })

        setCurrentUser(null)
       
    }

    useEffect(() => {
      localStorage.setItem("user",JSON.stringify(currentUser))
    
    }, [currentUser])

   return (
    <AuthContext.Provider value={{currentUser,login,logout}}>
        {children}
    </AuthContext.Provider>
   )
} 