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
  doc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { formControlClasses } from "@mui/material";
import "./page.css";
import Loader from "../components/Loader";

const itemCard = () => {
  const [items, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const colRef = query(collection(db, "products"));
    console.log(colRef);
    let product_data = [];
    const q = onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        product_data.push({ ...doc.data(), id: doc.id });
      });
      console.log(product_data);
      setData(product_data);
      setIsLoading(false);
    });
  }, []);

  const handleApprove = (id) => {
    const docRef = doc(db, "products", id);
    console.log(docRef);

    updateDoc(docRef, {
      approved: true,
    });
  };

  return (
    <>
      <div className="p-5 bg-stone-50">
        <h1 className="text-lg font-semibold text-center font-mono tracking-wide bg-blue-200 rounded-lg p-2">
          Admin's Dashboard
        </h1>
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="10"
          className="text-center text-2xl font-semibold text-stone-600 tracking-wider m-3"
        >
          Accept/Reject The Products which Want To Be Shown For Sale
        </marquee>
        {/* <button onClick={fetchDataFromFireStore}>get data</button> */}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {isLoading ? (
            <Loader />
          ) : (
            items.map((item) => (
              <Item item={item} handleApprove={handleApprove} />
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default itemCard;

function Item({ item, handleApprove }) {
  return (
    <li
      key={item.id}
      className="flex flex-col gap-1 text-center justify-center items-center p-3"
    >
      <div className="rounded-lg overflow-hidden shadow-md bg-white md:w-80 w-64 p-8">
        <p className="email">Owner: {item.email}</p>
        <p className=" item-name">Product-Name: {item.itemName}</p>
        <p className="item-price">Product-Price: {item.itemPrice}</p>
        <p className="item-price">Product-Description: {item.itemDescribe}</p>
        <p>{item.id}</p>
        <div className="flex flex-row space-x-3 justify-center">
          <button
            className="cursor-pointer bg-green-500 rounded-lg p-2 mt-3 transition-all duration-300 hover:bg-green-400 hover:text-stone-800 text-stone-700 font-semibold hover:tracking-wider"
            onClick={() => handleApprove(item.id)}
          >
            Accept
          </button>

          <Link
            href={{
              pathname: "/SelectedProduct",
              query: { id: `${item.id}` },
            }}
            className="cursor-pointer bg-red-500 rounded-lg p-2 mt-3 transition-all duration-300 hover:bg-red-400 hover:text-stone-800 text-stone-700 font-semibold hover:tracking-wider"
          >
            Reject
          </Link>
        </div>
      </div>
    </li>
  );
}
