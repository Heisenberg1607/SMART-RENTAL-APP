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
  updateDoc
} from "firebase/firestore";
import Link from "next/link";
import { formControlClasses } from "@mui/material";
import "./page.css";

const itemCard = () => {
  const [items, setData] = useState([]);
  useEffect(() => {
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
      <div>
        <h1 className="header-dashboard">Dashboard</h1>
        <h1 className="sub-header">Products which are for sale</h1>
        {/* <button onClick={fetchDataFromFireStore}>get data</button> */}

        <ul className="all-products-borrower">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id}>
                <p className="email">Owner: {item.email}</p>
                <p className=" item-name">Product-Name: {item.itemName}</p>
                <p className="item-price">Product-Price: {item.itemPrice}</p>
                <p className="item-price">
                  Product-Description: {item.itemDescribe}
                </p>
                <p>{item.id}</p>
                <button
                  className="approve-button"
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </button>

                <Link
                  href={{
                    pathname: "/SelectedProduct",
                    query: { id: `${item.id}` },
                  }}
                  className="reject-button"
                >
                  Reject
                </Link>
              </li>
            ))
          ) : (
            <h1>Data not fetched</h1>
          )}
        </ul>
      </div>
    </>
  );
};

export default itemCard;
