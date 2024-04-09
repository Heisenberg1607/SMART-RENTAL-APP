"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import "./page.css";
import { useRouter } from "next/navigation";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
  uploadTaskSnapshot,
} from "firebase/storage";
import productData from "../data";
import ProtectedRoute from "../components/ProtectedRoute";

const page = () => {
  const router = useRouter();
  const { loggedUser, logOut, storeItemData } = UserAuth();

  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemDescribe, setItemDescribe] = useState();
  const [picture, setPicture] = useState([]);
  const [object, setObject] = useState(productData);

  // console.log(picture);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem("email");
    console.log(email);

    const dataStore = storeItemData(itemName, itemPrice, itemDescribe, email);

    if (dataStore) {
      console.log("done!");
    } else {
      console.log("not done!");
    }

    if (picture) {
      const storageRef = ref(storage, `images/${email}`);
      await uploadBytes(storageRef, picture);
    }

    // append new data into the array
    const newObject = {
      email: email,
      productName: itemName,
      productPrice: itemPrice,
      productDescribe: itemDescribe,
    };

    setObject((prevState) => [...prevState, newObject]);
    console.log("this is object: ", object);
  };

  useEffect(() => {
    console.log("Updated object:", object);
  }, [object]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const goToDashboard = () => {
    router.push("/AdminDashboard");
  };

  const goToOwnerPage = () => {
    router.push("/Owner");
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   console.log(image);
  // }

  // console.log("from owner page: ", loggedUser);
  return (
    <>
      <ProtectedRoute>
        <div className="w-screen h-screen bg-stone-200">
          <div className="text-2xl text-stone-600 font-semibold tracking-widest text-center p-3">
            <marquee> Welcome To Your Owner's Page</marquee>
          </div>

          <div className="bg-[#006494] w-screen h-screen">
            <div>
              <div className="flex justify-center items-center h-40 mb-6">
                <div className="border-1 bg-blue-300 text-center rounded-md shadow-md w-96 h-24 ">
                  <p className="text-stone-800 font-mono font-medium tracking-wide p-3">
                    Please Answer a few basic questions below to add your
                    product for renting purposes
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-evenly gap-7 items-stretch">
                <div className="left-navigation">
                  <ul className="left-nav-items">
                    <button
                      onClick={goToDashboard}
                      className="rounded-md hover:bg-stone-400 transition-all duration-300 font-semibold"
                    >
                      Owner's Dashboard
                    </button>
                    <button
                      onClick={goToOwnerPage}
                      className="rounded-md hover:bg-stone-400 transition-all duration-300 font-semibold"
                    >
                      Put something for rent
                    </button>

                    <button
                      onClick={() => {
                        logOut();
                      }}
                      className="rounded-md hover:bg-stone-400 transition-all duration-300 font-semibold"
                    >
                      LogOut
                    </button>
                  </ul>
                </div>

                <div className="flex justify-center items-center h-80">
                  <form
                    className="bg-[#D5DEEF] text-center w-[900px] flex flex-col rounded-sm p-10"
                    onSubmit={handleSubmit}
                  >
                    <span className="flex flex-row gap-2 justify-between items-center mb-4">
                      <label
                        htmlFor="item-name"
                        className="text-stone-700 font-semibold text-lg"
                      >
                        Enter The Name Of The Product You Want To Rent
                      </label>
                      <input
                        type="text"
                        name=""
                        id="item-name"
                        value={itemName}
                        onChange={(e) => {
                          setItemName(e.target.value);
                        }}
                        className="rounded-full p-2 w-80"
                      />
                    </span>
                    <span className="flex flex-row gap-2 justify-between items-center mb-4">
                      <label
                        htmlFor="item-price"
                        className="text-stone-700 font-semibold text-lg"
                      >
                        <label
                          htmlFor="item-price"
                          className="text-stone-700 font-semibold text-lg"
                        >
                          {itemName
                            ? `What Would Be The Price For The ${itemName} 💰`
                            : "What Would Be The Price For Your Product 💰"}
                        </label>
                      </label>
                      <input
                        type="text"
                        name=""
                        id="item-price"
                        value={itemPrice}
                        onChange={(e) => {
                          setItemPrice(e.target.value);
                        }}
                        className="rounded-full p-2 w-80"
                      />
                    </span>
                    <span className="flex flex-row gap-2 justify-between items-center mb-4">
                      <label
                        htmlFor="item-image"
                        className="text-stone-700 font-semibold text-lg"
                      >
                        {itemName
                          ? `Please Add An Image Of ${itemName}📸 `
                          : "Please Add An Image Of Your Product 📸"}
                      </label>
                      <input
                        type="file"
                        accept="image/*" // Added accept attribute for image files
                        onChange={handleImageChange}
                        className="rounded-full p-2 file:p-1 file:bg-blue-300 file:rounded-sm file:hover:bg-blue-200 file:cursor-pointer file:text-stone-900 w-80"
                      />
                    </span>
                    <span className="flex flex-row gap-2 justify-between items-center mb-5">
                      <label
                        htmlFor="item-description"
                        className="text-stone-700 font-semibold text-lg"
                      >
                        Describe Your Product Under 300 Words 📝
                      </label>
                      <textarea
                        type="text"
                        name=""
                        id="item-description"
                        value={itemDescribe}
                        onChange={(e) => {
                          setItemDescribe(e.target.value);
                        }}
                        className="rounded-md p-1 w-80"
                      />
                    </span>
                    {itemName && (
                      <div className="flex justify-center">
                        <button className="text-md border-2 border-blue-200 bg-blue-500 rounded-xl p-3 text-stone-900 font-medium w-48 hover:w-56 transition-all duration-300 hover:text-stone-50">
                          Display for Rent
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default page;
