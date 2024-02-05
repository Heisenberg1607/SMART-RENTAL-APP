"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const itemCard = () => {
  const [userData, setUserData] = useState([]);

  async function fetchDataFromFireStore() {
    const email = sessionStorage.getItem("email");
    console.log(email);
    const querySnapshot = await getDocs(
      collection(db, `products/${email}/all_products`)
    );

    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    console.log(data);

    return data;
  }

  useEffect(() => {
    async function dataFetch() {
      const data = await fetchDataFromFireStore();
      setUserData(data);
    }

    dataFetch();
  }, []);

  return (
    <>
      <div>
        <h1 className="header-dashboard">Dashboard</h1>
        <h1 className="sub-header">Products which are for sale</h1>
        {/* <button onClick={fetchDataFromFireStore}>get data</button> */}

        <div className="item-cards">
          {userData.map((user) => (
            <div key={user.id} className="item-card">
              <p>Item Name: {user.itemName}</p>
              <p>Item Price: {user.itemPrice}</p>
              <p>Item Description: {user.itemDescribe}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default itemCard;
