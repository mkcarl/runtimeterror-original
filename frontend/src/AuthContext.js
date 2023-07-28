import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";



const AuthContext = React.createContext({})

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
     
    function login(email, password){
        return signInWithEmailAndPassword(auth, email,password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
    }, [])
    

    const value = {
        currentUser, 
        login
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}