"use client";
import React, { useEffect, useState } from "react";
// import productData from "../data";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
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

  useEffect(() => {
    const colRef =  query(collection(db, "products"));
    let product_data = [];
    const q =  onSnapshot(colRef,(querySnapshot) =>{
    querySnapshot.forEach( (doc) => {
      product_data.push({ ...doc.data(),id: doc.id});
    });
    setData(product_data);
    });      
  }, []);

  return (
    <div>
      <h1>Hey User</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => <li key={item.id}>{item.itemName}</li>)
        ) : (
          <h1>Data not fetched</h1>
        )}
      </ul>
    </div>
  );
};

export default page;
