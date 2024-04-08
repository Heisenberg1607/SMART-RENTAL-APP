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
        <div className="owner-page">
          <div className="left-navigation">
            <ul className="left-nav-items">
              <button onClick={goToDashboard}>Owner's Dashboard</button>

              <button onClick={goToOwnerPage}>Put something for rent</button>

              <button
                onClick={() => {
                  logOut();
                }}
              >
                LogOut
              </button>
            </ul>
          </div>
          <div className="rent-item-form">
            <h1>Put something for rent</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="item-name">Item Name</label>
              <input
                type="text"
                name=""
                id="item-name"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />

              <label htmlFor="item-price">Item Price</label>
              <input
                type="text"
                name=""
                id="item-price"
                value={itemPrice}
                onChange={(e) => {
                  setItemPrice(e.target.value);
                }}
              />

              <label htmlFor="item-image">Item Image</label>
              <input
                type="file"
                accept="image/*" // Added accept attribute for image files
                onChange={handleImageChange}
              />

              <label htmlFor="item-description">Describe your item</label>
              <textarea
                type="text"
                name=""
                id="item-description"
                value={itemDescribe}
                onChange={(e) => {
                  setItemDescribe(e.target.value);
                }}
              />

              {/* <h1>{itemName}</h1> */}

              <button type="submit">Display for Rent</button>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default page;
