"use client";

import Link from "next/link";
import "./page.css";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  deleteDoc,
  // query,
  // where,
} from "firebase/firestore";
const page = () => {
  const [data, setData] = useState([]);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", email);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
          console.log("this is data: ", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (email) {
      fetchProductData();
    }

    
  }, [email]);
  console.log("data in state", data);

  const handleDelete = () => {
    try {
      const docRef = doc(db, "products", `${email}`);
      deleteDoc(docRef);
      console.log("Item Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data !== null ? (
        <div className="rounded-lg overflow-hidden shadow-md bg-white md:w-80 w-64 p-8">
          <p className="email">Owner: {data.email}</p>
          <p className=" item-name">Product-Name: {data.itemName} </p>
          <p className="item-price">Product-Price: {data.itemPrice} </p>
          <p className="item-price">
            Product-Description: {data.itemDescribe}{" "}
          </p>
          <div className="delete-btn">
            <button onClick={handleDelete()}>Delete the product</button>
          </div>
        </div>
      ) : (
        <h1>No item for rent!</h1>
      )}
    </div>
  );
};

export default page;
