"use client";
import React from "react";
import { useState, useContext } from "react";
import { UserAuth } from "../Context/AuthContext";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { googleSignIn } = UserAuth();

  const handleSubmit = (email,password) => {
    
    console.log(email, password);

    googleSignIn(email, password);
  
  }

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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default page;
