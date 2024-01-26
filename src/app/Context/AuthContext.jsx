// 'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  
} from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");

  async function addDataToFireStore(name, email, type,password) {
    console.log("email is this in AuthCon", email);

    try {
      console.log("this is type in AuthContext", type);
      console.log("this is type in AuthContext", email);
      const docRef = await setDoc(doc(collection(db, "users"), email), {
        name: name,
        email: email,
        type: type,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const createUser = (email, password) => {
    const authInstance = getAuth();
    createUserWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorMessage(errorMessage);
        console.log(errorMessage);
        // ..
      });
  };

  const googleSignIn = (email, password) => {
    const provider = new GoogleAuthProvider();

    const authInstance = getAuth();

    signInWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed In" , user);
        alert("Welcome " + user.email)
        
      })
      .catch((error) => {
        alert("Wrong Credential")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      return () => unsubscribe();
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        createUser,
        errorMessage,
        addDataToFireStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
