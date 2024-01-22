'use client'
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import "./signUp.css"


const page = ({ onSubmit }) => {

  const {createUser, errorMessage, addDataToFireStore } = UserAuth();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");


  console.log("this is the value in state" , type);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, password);

    console.log("this is the value in handleSubmit", type);

    const added = addDataToFireStore(name, email, type,password);

    console.log("result is: ",added);

    if (added) {
      setName("");
      setEmail("");
      setType("");

      alert("Account Created");
    } 
    console.log(email, password);
    // googleSignIn(email, password);
  };

  return (
    <>
      <div>{ errorMessage ? <h1>email already in use </h1> : <h1></h1>}</div>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="">Name:
        
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          
        </label>

        <label>
          Category:
          <select name="Type of customer" id="" onChange={(e) => { setType(e.target.value); console.log("Selected type:", e.target.value);  }}>
            <option value=""></option>
            <option value="Borrower" >Borrower</option>
            <option value="Owner">Owner</option>
          </select>
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </>
  );
};

export default page;
