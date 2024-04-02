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

  const p_id = searchParams.get("id");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", `${p_id}`);
        console.log(docRef);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
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
        <p>Product Name: {data.itemDescription}</p>
        <p>Product Name: {data.itemPrice}</p>
        <button>Rent this product</button>
      </>
    </div>
  );
};

export default page;
