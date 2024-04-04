import { createContext, useState, useContext } from "react";
import { UserAuth } from "../Context/AuthContext";

const SignupContext = createContext();

export function SignUpProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [userName, setUserName] = useState("");
  const [walletAddress, setAddress] = useState("");

  const { createUser, errorMessage, addDataToFireStore } = UserAuth();

  console.log("this is the value in state", type);

  function handleUserName(e) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, password);

    console.log("this is the value in handleSubmit", type);

    const added = addDataToFireStore(name, email, type, password,walletAddress);

    console.log("result is: ", added);

    if (added) {
      setName("");
      setEmail("");
      setType("");

      alert("Account Created");
    }
    console.log(email, password);
    // googleSignIn(email, password);
  };

  function handleSetType(e) {
    setType(e.target.value);
  }
  function handleSetName(e) {
    setName(e.target.value);
  }
  function handleSetPassword(e) {
    setPassword(e.target.value);
  }
  function handleSetEmail(e) {
    setEmail(e.target.value);
  }
  function handleSetAddress(e) {
    setAddress(e.target.value);
  }
  return (
    <SignupContext.Provider
      value={{
        name,
        email,
        password,
        type,
        walletAddress,
        handleSetEmail,
        handleSetPassword,
        handleSetName,
        handleSetType,
        handleSubmit,
        errorMessage,
        userName,
        handleUserName,
        handleSetAddress,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

// useSignUp hook
export const useSignUp = () => {
  const context = useContext(SignupContext);

  return context || {}; // return an empty object if context is undefined
};
