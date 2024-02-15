"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { formControlClasses } from "@mui/material";

const itemCard = () => {
  const [userData, setUserData] = useState([]);

  async function fetchDataFromFireStore() {
    const email = sessionStorage.getItem("email");
    // console.log(email);
    // const querySnapshot = await getDocs(
    //   collection(db, `products/${email}/all_products`)

    const colRef = collection(db, "products");
    console.log(colRef);
    const q = await query(colRef, where("email", "==", email));

    console.log(q);

    const data = [];
    const query_docs = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log("this is query data: ", data);
      setUserData(data);
    });

    // console.log(query_docs);

    return data;
  }

  useEffect(() => {
    async function dataFetch() {
      const data = await fetchDataFromFireStore();
      console.log("data in dataFetch: ", data);
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
              <div>
                <p>Item-Name: {user.itemName}</p>
                <p>Item-Price: {user.itemPrice}</p>
                <p>Item-Description: {user.itemDescribe}</p>
              </div>
              <button className="edit-btn">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default itemCard;
