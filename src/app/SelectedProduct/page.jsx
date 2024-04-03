"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  // query,
  // where,
} from "firebase/firestore";

const page = () => {
  const [data, setData] = useState([]);

  const searchParams = useSearchParams();

  const p_id = searchParams.get("itemId");
  // console.log("param: ",p_id);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", `${p_id}`);
        // console.log("this is docRef: ",docRef);

        const docSnap = await getDoc(docRef);

        console.log("this is docSnap: ",docSnap.data());

        if (docSnap.exists()) {
          console.log("data: ", docSnap.data());
          
          setData(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      }
    };


    if (p_id) {
      fetchProductData();
    }
  }, []);

  console.log("this is state", data);

  return (
    <div>
      <>
        <p>Product Name: {data.itemName}</p>
        <p>Product Description: {data.itemDescription}</p>
        <p>Product Price: {data.itemPrice}</p>
        <button>Rent this product</button>
      </>
    </div>
  );
};

export default page;
