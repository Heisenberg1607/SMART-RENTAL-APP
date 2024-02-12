"use client"
import Head from "next/head";
import "./home.css";
import { useRouter } from "next/navigation";
// import "./globals.css"



export default function Home() {

  const router = useRouter();

  const goToBorrower = () => {
    router.push("/Borrower");
  }

  return (
    <>
      <div className="home-page">
        <h1 className="hero-headline text-black">Smart Rental App</h1>

        <button className="get-started-btn" onClick={goToBorrower}> Get Started</button>
      </div>
    </>
  );
} 