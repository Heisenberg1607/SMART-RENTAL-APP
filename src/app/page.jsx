"use client";
import Head from "next/head";
import "./home.css";
import Button from "./components/Button";
// import "./globals.css"

export default function Home() {
  return (
    <>
      <div className="home-page">
        <h1 className="hero-headline text-black">Smart Rental App</h1>

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
