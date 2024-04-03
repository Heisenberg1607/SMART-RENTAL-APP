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
import { useRouter } from "next/navigation";
import Button from "../components/Button";

const page = () => {
  const [data, setData] = useState([]);

  const searchParams = useSearchParams();

  const p_id = searchParams.get("itemId");
  // console.log("param: ",p_id);

  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", `${p_id}`);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

  function handleBack() {
    router.back();
  }

  return (
    <div>
      <Button onClick={handleBack} type="goBack">
        👈 Go Back
      </Button>
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
