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
    googleSignIn(email, password);
  };

  const handleAdmin = () => {
    // e.preventDefault();
    router.push("./DashBoardLogin");
  };

  return (
    <div className="text-center bg-slate-100 p-8 rounded-md mr-96 ml-96 mt-32 mb-32 shadow-xl">
      <h1 className="text-stone-600 font-bold mt-10 tracking-widest font-mono capitalize text-xl">
        Login to your account below
      </h1>

      <form onSubmit={handleSubmit} className="space-x-2 mt-10">
        <div className="mb-6 flex flex-col items-center justify-center gap-4">
          <input
            className="border border-stone-300 rounded-lg w-56 placeholder:text-sm placeholder:text-stone-400 p-1"
            type="email"
            value={email}
            placeholder="Enter Your Email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="border rounded-lg border-stone-300 w-56 placeholder:text-sm placeholder:text-stone-400 p-1 transition-all duration-300"
            type="password"
            placeholder="Enter Your Password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="border-1 p-2 bg-blue-500 text-stone-900 font-semibold text-sm hover:bg-blue-400 hover:font-medium transition-all duration-300 hover:text-stone-800 w-28 hover:w-36 rounded-xl">
          Login
        </button>

        <p
          onClick={handleAdmin}
          className="mt-5 text-gray-500 font-semibold cursor-pointer hover:tracking-wider transition-all duration-300"
        >
          Admin? Log in here.
        </p>
      </form>
    </div>
  );
};

export default page;
