"use client";
import React, { useEffect, useState } from "react";
// import productData from "../data";
import { db } from "../firebase";
import { collection, query, onSnapshot, getDoc } from "firebase/firestore";
import "./page.css";
import { useSignUp } from "../Context/SignupContext";
// import { getDatabase, ref, onValue } from "firebase/database";

const page = () => {
  const [items, setData] = useState([]);
  // useEffect(() => {
  //   const colRef = collection(db, "products");
  //   console.log("colRef: ", colRef);
  //   const docs = getDocs(colRef);
  //   console.log("this is docs: ", colRef);
  //   getDocs(colRef).then((docs) => {
  //     docs.forEach((docs) => {
  //       const colRef1 = collection(`products /${docs.id}/all_products`);
  //       console.log("this is inside colRef 1: ", colRef1);
  //       getDocs(colRef1).then((docs1) => {
  //         let arr = [];
  //         docs1.forEach((docs1) => {
  //           arr.push(docs1.data());
  //         });
  //         console.log("this is inside array", arr);
  //       });
  //     });
  //   });
  // }, []);

  const { userName } = useSignUp();

  useEffect(() => {
    const colRef = query(collection(db, "products"));
    let product_data = [];
    const q = onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        product_data.push({ ...doc.data(), id: doc.id });
      });
      setData(product_data);
    });
  }, []);

  const handleClick = () => {
    const email = sessionStorage.getItem("email");
    const colRef = getDoc(db, `user/${email}`);

    console.log(colRef);
  };

  return (
    <div className="p-5 bg-stone-50">
      <h1 className="text-lg font-semibold text-center font-mono">
        Hello, {userName}
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {items.length > 0 ? (
          items.map((item) => <Item item={item} handleClick={handleClick} />)
        ) : (
          <h1>Data not fetched</h1>
        )}
      </ul>
    </div>
  );
};

function Item({ item, handleClick }) {
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

        <button
          className="text-sm border-2 border-blue-200 bg-blue-400 rounded-full p-2 text-stone-800 font-semibold w-40 hover:w-48 transition-all duration-300 hover:text-stone-50"
          onClick={handleClick}
        >
          Rent this Product
        </button>
      </div>
    </li>
  );
}

export default page;
