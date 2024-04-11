"use client";
import React, { useEffect, useState } from "react";
// import productData from "../data";
import { db } from "../firebase";
import { collection, query, onSnapshot, getDoc, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "./page.css";
import { useSignUp } from "../Context/SignupContext";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
  uploadTaskSnapshot,
} from "firebase/storage";
// import { getDatabase, ref, onValue } from "firebase/database";
import CryptoJS from "crypto-js";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { constants, ethers } from "ethers";
import Web3Modal from "web3modal";
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const page = () => {
  const [items, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // useEffect(() => {
  //   const colRef = collection(db, "products");
  //   console.log("colRef: ", colRef);
  //   const docs = getDocs(colRef);
  //   console.log("this is docs: ", colRef);
  //   getDocs(colRef).then((docs) => {
  //     docs.forEach((docs) => {
  //       const colRef1 = collection(products /${docs.id}/all_products);
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

  const router = useRouter();

  useEffect(() => {
    checkWalletIsConnected();
    setIsLoading(true);
    const colRef_temp = query(collection(db, "products"));
     
    const colRef = query(colRef_temp, where("approved", "==", true));
    
    let product_data = [];
    const q = onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        product_data.push({ ...doc.data(), id: doc.id });
      });
      setData(product_data);
      setIsLoading(false);
    });


    
  }, []);

  const handleClick = (itemId) => {
    // const colRef = getDoc(db, `user/${email}`);
    router.push(`/SelectedProduct?itemId=${itemId}`);
  };

  const checkWalletIsConnected = async () => {
    setErrorMessage("To get product list please connect Metamask!");
    if (window.ethereum || window.ethereum.isConnected()) {
      const account = await window.ethereum.request({ method: "eth_accounts" });
      if (account.length) {
        accountChangedHandler(provider.getSigner());
      } else {
        provider.send("eth_requestAccounts", []).then(async () => {
          await accountChangedHandler(provider.getSigner());
        });
      }
    } else {
      console.log("error");
      setErrorMessage("Please Install Metamask!!!");
    }
  };

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setErrorMessage(null);
  };

  // Decryption of the userName
  const encryptedData = sessionStorage.getItem("encryptedUserName");
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, "secretKey");
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const userNameOfCustomer = JSON.parse(decryptedData);

  return (
    <div className="p-5 bg-stone-50">
      <h1 className="text-lg font-semibold text-center font-mono">
        Hello, {userNameOfCustomer}
      </h1>
      {!errorMessage ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {isLoading ? (
            <Loader />
          ) : (
            items.map((item) => <Item item={item} handleClick={handleClick} />)
          )}
        </ul>
      ) : (
        errorMessage
      )}
    </div>
  );
};

function Item({ item, handleClick }) {
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
          <Button
            type="rentBorrowerButton"
            onClick={() => handleClick(item.email)}
            className="mt-3"
          >
            View More
          </Button>
        </div>
      </div>
    </li>
  );
}

export default page;

{
  /* {items.length > 0 ? (
          items.map((item) => <Item item={item} handleClick={handleClick} />)
        ) : (
          <h1>Data not fetched</h1>
        )} */
}
