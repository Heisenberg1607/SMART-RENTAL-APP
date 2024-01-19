// 'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth,GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  
  const createUser = (email,password) => {
      const authInstance = getAuth();
      createUserWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("done!")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    }
    
    const googleSignIn = (email, password) => {
        const provider = new GoogleAuthProvider();

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

    const logOut = () => {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            return() => unsubscribe()
        })
    }, [user])

  return (
      <AuthContext.Provider value={{ user, googleSignIn, logOut, createUser }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
