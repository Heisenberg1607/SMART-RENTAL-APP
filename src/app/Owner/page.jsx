"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import "./page.css";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { loggedUser, logOut, storeItemData } = UserAuth();
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemDescribe, setItemDescribe] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem("email");
    console.log(email);

    const dataStore = storeItemData(itemName, itemPrice, itemDescribe, email);

    if (dataStore) {
      console.log("done!");
    } else {
      console.log("not done!");
    }
  };

  const goToDashboard = () => {
    router.push("/Dashboard");
  };

  const goToOwnerPage = () => {
    router.push("/Owner");
  }

  // console.log("from owner page: ", loggedUser);
  return (
    <>
      <div className="owner-page">
        <div className="left-navigation">
          <ul className="left-nav-items">
            <button onClick={goToDashboard}>Dashboard</button>

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
            <input type="file" name="" id="item-image" />

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
    </>
  );
};

export default page;
