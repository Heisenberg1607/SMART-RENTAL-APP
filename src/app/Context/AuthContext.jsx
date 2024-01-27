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
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { useRouter } from "next/navigation";

const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  let loggedUser = { name: "", email: "", password: "", type: "" };

  
  

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
      .then(async (userCredential) => {
        
        const user = userCredential.user;
        console.log("Signed In" , user);
        alert("Welcome " + user.email)
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        console.log(docData.name);
        loggedUser = { name: docData.name, email: docData.email, password: docData.password, type: docData.type };
        console.log("logged in user: ", loggedUser);
        // setLoggedUser(loggedUser => ({  newData }));
        // console.log("logged in user: ", loggedUser);

        if (loggedUser.type == "Owner") {
          sessionStorage.setItem("email", loggedUser.email);
          sessionStorage.setItem("type", loggedUser.type);
          router.push("/Owner");
        } else {
          sessionStorage.setItem("email", loggedUser.email);
          sessionStorage.setItem("email", loggedUser.type);
          router.push("/Borrower");
        }
        
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
        loggedUser,
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
