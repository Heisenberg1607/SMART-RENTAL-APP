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
    <div className="max-w-md mx-auto mb-96 mt-14 text-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
        <div className="mb-4">
          <p className="text-xl font-semibold">Product Name: {data.itemName}</p>
          <p className="text-gray-600">
            Product Description: {data.itemDescribe}
          </p>
          <p className="text-gray-600">Product Price: {data.itemPrice}</p>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button onClick={handleBack} type="goBack" className="mb-4">
            👈 Go Back
          </Button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Rent this product
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
