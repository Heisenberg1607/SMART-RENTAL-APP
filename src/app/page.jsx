"use client"
import Head from "next/head";
import "./home.css";
import { useRouter } from "next/navigation";
// import "./globals.css"



export default function Home() {

  const router = useRouter();

  const goToSignUp = () => {
    router.push("/SignUp");
  }

  return (
    <>
      <div className="home-page">
        <h1 className="hero-headline text-black">Smart Rental App</h1>

        <button className="get-started-btn" onClick={goToSignUp}> Get Started</button>
      </div>
    </>
  );
} 