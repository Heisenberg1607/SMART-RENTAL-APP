// 'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function addDataToFireStore(
    name,
    email,
    type,
    password,
    walletAddress
  ) {
    console.log("we are in addDataToFirestore");
    console.log("email is this in AuthCon", email);

    try {
      console.log("this is type in AuthContext", type);
      console.log("this is type in AuthContext", email);

      if (type === "Owner") {
        const docRef = await setDoc(doc(collection(db, "users"), email), {
          name: name,
          email: email,
          type: type,
          password: password,
          walletAddress: walletAddress,
        });
      } else {
        const docRef = await setDoc(doc(collection(db, "users"), email), {
          name: name,
          email: email,
          type: type,
          password: password,
          // walletAddress: walletAddress,
        });
      }
      // setDoc(doc(db, `products/${email}`), {
      //   id: email,
      // });
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

        console.log("the user is logged in: ", user);
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

  const googleSignIn = async (email, password) => {
    try {
      const authInstance = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const user = userCredential.user;

      toast.success("Welcome " + user.email);

      const docRef = doc(db, "users", email);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      //   const docData = docSnap.data();
      //   console.log("this is doc data",docData);

      //   setIsAuthenticated(true);

      //   console("email", docData.email);
      //   sessionStorage.setItem("email", docData.email);
      //   sessionStorage.setItem("type", docData.type);

      //   if (docData.type === "Owner") {
      //     router.push("/Owner");
      //     router.refresh();
      //   } else {
      //     router.push("/Borrower");
      //   }
      // } catch (error) {
      //   alert("Wrong Credential");
      //   console.error("Error signing in:", error);
      // }

      if (docSnap.exists()) {
        const docData = docSnap.data();

        setIsAuthenticated(true);

        sessionStorage.setItem("email", docData.email);
        sessionStorage.setItem("type", docData.type);

        if (docData.type === "Owner") {
          router.push("/Owner");
          router.refresh();
        } else {
          router.push("/Borrower");
        }
      } else {
        toast.error("User data not found");
      }
    } catch (error) {
      toast.error("Wrong Credential");
      console.error("Error signing in:", error);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("type");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  async function storeItemData(itemName, itemPrice, itemDescribe, email) {
    try {
      const docRef = setDoc(doc(collection(db, "products"), email), {
        itemPrice: itemPrice,
        itemName: itemName,
        itemDescribe: itemDescribe,
        email: email,

        approved: false,
      }).then(() => {
        alert("Product added!");
        console.log("Document written with ID: ", docRef.id);
        return true;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      return () => unsubscribe();
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        createUser,
        errorMessage,
        addDataToFireStore,
        storeItemData,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

/*To make sure any un-auhenticated user can't access the Owner's page using the URL, I have taken below steps 👇

1) Checked here if the user is authenticated or not using the isAuthenticated hook -> googleSign() is already authenticating
the user, so after it authenticates the user, we simply set the state of isAuthenticated to be true.
2) We passed the isAuthenticated to the app using context
3) Created a new page component called "ProtectedRoute"
4) This ProtectedRoute is simply checking if (!isAuthenticated), if so then we are redirecting user to the Login Page
5) But if the user isAuthenticated, then we are simply showing the "children"
6) We enclose our Owner's page with the ProtectedRoute component. So now the Owner's page becomes children to ProtectedRoute.
7) So before everytime the browser wants to display the Owener's page, it will first render the ProtectedRoute component
and check if the isAuthenticated is true or false, based on that only it will display our Owner's page hence securing our 
Owner's page from fraudaulents.

*/
