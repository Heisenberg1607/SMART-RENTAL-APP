// import { createContext, useState, useContext } from "react";
// import { UserAuth } from "../Context/AuthContext";

// const SignupContext = createContext();

// export function SignUpProvider({ children }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState("");

//   const { createUser, errorMessage, addDataToFireStore } = UserAuth();

//   console.log("this is the value in state", type);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createUser(email, password);

//     console.log("this is the value in handleSubmit", type);

//     const added = addDataToFireStore(name, email, type, password);

//     console.log("result is: ", added);

//     if (added) {
//       setName("");
//       setEmail("");
//       setType("");

//       alert("Account Created");
//     }
//     console.log(email, password);
//     // googleSignIn(email, password);

//     // function handleSelect(e) {
//     //   (e) => setType(e.target.value);
//     // }
//   };

//   function handleSetType(e) {
//     setType(e.target.value);
//   }
//   return (
//     <SignupContext.Provider
//       value={
//         (name,
//         email,
//         password,
//         type,
//         handleSubmit,
//         setEmail,
//         setPassword,
//         setType,
//         setName,
//         errorMessage,
//         handleSetType)
//       }
//     >
//       {children}
//     </SignupContext.Provider>
//   );
// }

// // useSignUp hook
// export const useSignUp = () => {
//   const context = useContext(SignupContext);
//   return context || {}; // return an empty object if context is undefined
// };
