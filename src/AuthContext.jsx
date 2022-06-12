
import React, { createContext, useEffect, useState } from 'react'

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';



export const AuthContext = createContext("");

function AuthContextProvider({ children }) {
    const [mainLoader, setMainLoader] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setMainLoader(false);

            return unsubscribe;
        })
    }, []);

    let value = user;

    return (
        <AuthContext.Provider value={value}>
            {mainLoader == false && children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider;