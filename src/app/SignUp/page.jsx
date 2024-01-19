'use client'
import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import "./signUp.css"


const page = ({ onSubmit }) => {

  const { googleSignIn,createUser } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, password);
    console.log(email, password);
    // googleSignIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <select name="Type of customer" id="">
          <option value="Borrower">Borrower</option>
          <option value="Giver">Giver</option>
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
  );
};

export default page;
