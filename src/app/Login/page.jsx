"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
// import { UserAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { UserAuth } from "../Context/AuthContext";
import "./page.css";

const page = () => {
  const router = useRouter();

  // const { type } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const { googleSignIn, loggedUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const demo = googleSignIn(email, password);
    console.log(demo);
  };

  function gotToDashBoardLogin() {
    router.push("./DashBoardLogin");
  }

  return (
    <>
      <div className="admin-login">
      <button className="admin-login-btn" onClick={gotToDashBoardLogin}>
        Admin Login
      </button>
      </div>
      <div className="sign-in-page">
        <h1 className="sign-in-header">Sign In</h1>
        <hr className="line-sign-in" />

        <form onSubmit={handleSubmit} className="form-sign-in">
          <input
            className="input-username"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
          <input
            className="input-pass"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
          />
          <button className="sign-in-btn">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default page;

{
  /* <span>
  <button className="get-started-btn" onClick={gotToDashBoardLogin}>
    Go To Dashboard
  </button>
</span>; */
}
