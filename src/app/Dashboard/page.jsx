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
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
  uploadTaskSnapshot,
} from "firebase/storage";
import Link from "next/link";
import { formControlClasses } from "@mui/material";
import "./page.css";
import Loader from "../components/Loader";
import { useSignUp } from "../Context/SignupContext";

const itemCard = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { adminName } = useSignUp();

  // useEffect(() => {
  //   setIsLoading(true);
  //   const colRef = query(collection(db, "products"));
  //   console.log(colRef);
  //   let product_data = [];
  //   const q = onSnapshot(colRef, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //       product_data.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log(product_data);
  //     setData(product_data);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "products"), where("approved", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productData = [];
      querySnapshot.forEach((doc) => {
        productData.push({ ...doc.data(), id: doc.id });
      });
      setItems(productData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = (id) => {
    const docRef = doc(db, "products", id);
    console.log(docRef);

    updateDoc(docRef, {
      approved: true,
    });
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "products", id);
    deleteDoc(docRef);
    console.alert("product deleted!");
  };

  return (
    <>
      <div className="p-5 bg-stone-50">
        <div className="text-lg font-semibold text-center font-mono tracking-wide bg-blue-200 rounded-lg p-3 flex flex-row justify-between">
          <h1 className="ml-2">Admin's Dashboard</h1>
          <h1 className="mr-2">{adminName}</h1>
        </div>
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="10"
          className="text-center text-2xl font-semibold text-stone-600 tracking-wider m-3"
        >
          Accept/Reject The Products which Want To Be Shown For Sale
        </marquee>
        {/* <button onClick={fetchDataFromFireStore}>get data</button> */}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
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
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch image URL from Firebase Storage
    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, `images/${item.email}`);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        console.log(imageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl(); // Fetch the image URL when the component mounts
  }, [item.email]);

  return (
    <li
      key={item.id}
      className="flex flex-col gap-2 text-center justify-center items-center p-3"
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-white w-full md:max-w-md rounded-b-md">
        <div className="relative md:h-64 w-full h-full ml-0 mt-0">
          <img
            src={imageUrl}
            alt="Product"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <p className="email">Owner: {item.email}</p>
          <p className="item-name">Product-Name: {item.itemName}</p>
          <p className="item-price">Product-Price: {item.itemPrice}</p>
          <p className="item-price">Product-Description: {item.itemDescribe}</p>
          <div className="flex flex-row space-x-3 justify-center mt-2 mb-4">
            <button
              className="cursor-pointer bg-green-500 rounded-lg p-2 mt-3 transition-all duration-300 hover:bg-green-400 hover:text-stone-800 text-stone-700 font-semibold hover:tracking-wider"
              onClick={() => handleApprove(item.id)}
            >
              Accept
            </button>

            <button
              // onClick={() => handleDelete(item.id)}
              className="cursor-pointer bg-red-500 rounded-lg p-2 mt-3 transition-all duration-300 hover:bg-red-400 hover:text-stone-800 text-stone-700 font-semibold hover:tracking-wider"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
