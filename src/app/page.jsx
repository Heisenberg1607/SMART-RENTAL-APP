"use client";
import Head from "next/head";
import "./home.css";
import Button from "./components/Button";
// import { useState } from "react";
import { useSignUp } from "./Context/SignupContext";
// import "./globals.css"

export default function Home() {
  const { userName, handleUserName } = useSignUp();
  return (
    <>
      <div className="home-page">
        <h1 className="hero-headline text-black absolute top-16 tracking-widest">
          Smart Rental Application.Co
        </h1>

        <form
          onSubmit={() => setName("")}
          className="flex-col text-center mb-4"
        >
          <h1 className="font-semibold text-stone-800 text-2xl mb-2 tracking-wide ">
            Welcome to our App!
          </h1>
          <input
            type="text"
            value={userName}
            onChange={handleUserName}
            className="rounded-full p-2 transition-all duration-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 placeholder:text-sm"
            placeholder="Enter Your Name..."
          ></input>
        </form>

        {userName ? (
          <div className="flex space-x-4">
            <span>
              <Button destination={"./Borrower"}>Get Started</Button>
            </span>
            <span>
              <Button destination={"./DashBoardLogin"}>Go To Dashboard</Button>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
