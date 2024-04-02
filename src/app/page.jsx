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
        <h1 className="text-5xl text-stone-900 mt-7 absolute top-16 tracking-widest">
          Smart Rental Application.Co
        </h1>
        <p className="text-center w-[850px] font-normal text-lg mt-0 tracking-wider mb-16">
          Welcome to{" "}
          <strong className="text-blue-900 text-md">
            Smart Rental Application.Co
          </strong>
          , your premier destination for streamlined rental solutions powered by
          <strong className="capitalize"> blockchain technology</strong>. Our
          innovative platform revolutionizes the rental process, offering secure
          transactions and transparent agreements for both property owners and
          renters. With intuitive features and user-friendly navigation, we're
          dedicated to simplifying every aspect of renting, from property search
          to lease agreements. Join us today and experience the future of
          renting with ease and confidence.
        </p>
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
            className="rounded-full p-2 transition-all duration-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 placeholder:text-sm mb-0"
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


