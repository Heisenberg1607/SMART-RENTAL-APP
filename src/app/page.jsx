"use client";
import Head from "next/head";
import "./home.css";
import Button from "./components/Button";
import { useState } from "react";
// import "./globals.css"

export default function Home() {
  const [name, setName] = useState("");
  function handleName(e) {
    setName(e.target.value);
  }
  return (
    <>
      <div className="home-page">
        <h1 className="hero-headline text-black absolute top-16">
          Smart Rental App
        </h1>

        <form onSubmit={() => setName("")} className="flex-col text-center">
          <h1 className="text-lg font-semibold text-stone-800">
            Welcome to our App!
          </h1>
          <input
            type="text"
            value={name}
            onChange={handleName}
            className="rounded-full p-2 transition-all duration-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 placeholder:text-sm"
            placeholder="Enter Your Name..."
          ></input>
        </form>

        <div style={{ display: "flex", gap: "10px" }}>
          <span>
            <Button destination={"./Borrower"}>Get Started</Button>
          </span>
          <span>
            <Button destination={"./DashBoardLogin"}>Go To Dashboard</Button>
          </span>
        </div>
      </div>
    </>
  );
}
