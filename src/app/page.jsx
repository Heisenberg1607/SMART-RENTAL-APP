"use client";
import "./home.css";
import Button from "./components/Button";
import { useSignUp } from "./Context/SignupContext";
import CryptoJS from "crypto-js";
import { useTextAnimation } from "./useTextAnimation";

export default function Home() {
  const { userName, handleUserName } = useSignUp();

  // Encrypting the userName for privacy
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(userName),
    "secretKey"
  ).toString();
  sessionStorage.setItem("encryptedUserName", encryptedData);

  // A custom hook for text animation.
  const { typedText } = useTextAnimation();

  return (
    <>
      <div className="home-page">
        <h1 className="text-4xl text-stone-900 mt-7 absolute top-16 tracking-widest">
          Rentify -{" "}
          <span className="text-blue-900 text-md font-medium">{typedText}</span>
        </h1>
        <p className="text-center w-[850px] font-normal text-lg mt-0 tracking-wider mb-16">
          Welcome to <strong className="text-blue-900 text-md">Rentify</strong>,
          your premier destination for streamlined rental solutions powered by
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
            Begin Entering Your Name
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
              <Button destination={"./Borrower"} type="homepageButton">
                Surf Products
              </Button>
            </span>
            <span>
              <Button destination={"./DashBoardLogin"} type="homepageButton">
                Go To Dashboard
              </Button>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
