"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
// import { UserAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { UserAuth } from "../Context/AuthContext";



const page = () => {

  const router = useRouter();

  // const { type } = UserAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const { googleSignIn, loggedUser } = UserAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password);
    googleSignIn(email, password);

    
    
  };


  




  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default page;









