"use client";
import React, { useEffect, useState } from "react";
// import productData from "../data";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { getDatabase, ref, onValue } from "firebase/database";

const page = () => {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    console.log("Inside useEffect");
    const colRef = collection(db, "products");
    const product_data = [];
    onSnapshot(colRef, (docs) => {
      docs.docs.forEach((doc) => {
        const colRef1 = collection(db, `products/${doc.id}/all_products`);
        onSnapshot(colRef1, (docs1) => {
          docs1.docs.forEach((doc1) => {
            // console.log(
            //   "Product: ",
            //   doc1.data().itemName,
            //   doc1.data().itemDescribe
            // );
            product_data.push(doc1.data());
          });
          console.log("this is product data", product_data);
          setData(product_data);
        });
      });
    });
  }, []);

  if (data.length > 0 && data[0]) {
    console.log("First item name:", data);
  } else {
    console.log("No items available");
  }
  return (
    <div>
      <h1>Hey User</h1>
      <ul>
        {data.length > 0 ? (
          data.map((item, index) => <li key={index}>{item.itemName}</li>)
        ) : (
          <h1>Data not fetched</h1>
        )}
      </ul>
    </div>
  );
};

export default page;
