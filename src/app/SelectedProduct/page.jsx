"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { constants, ethers } from "ethers";
import Web3Modal from "web3modal";
import contract from "../Context/TransferEth.json";
// import contract from "../Context/RecieveEth.json";
const ContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ContractABI =  contract.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
//Fetching Contact from blockchain
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress,ContractABI,signerOrProvider)

const page = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const p_id = searchParams.get("itemId");

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const colRef = query(collection(db, "products"));
    let product_data = [];
    const q = onSnapshot(colRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        product_data.push({ ...doc.data(), id: doc.id });
      });
      setItem(product_data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    checkWalletIsConnected();
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

    const fetchOwnerAddress = async () => {
      try {
        const docRef = doc(db, "users", `${p_id}`);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOwnerDetails(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (p_id) {
      fetchProductData();
      fetchOwnerAddress();
    }
  }, []);

  function handleBack() {
    router.back();
  }

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, `images/${data.email}`);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        console.log(imageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };
    fetchImageUrl();
  }, [data.email]);

  const transferProcess = async () => {
    if( await checkWalletIsConnected()){
      const signer = provider.getSigner()
      const address = signer.getAddress();
      const contract = await fetchContract(signer);
      const ownerAddress = ownerDetails.walletAddress
      console.log('sender address - ' + address)
      console.log(ownerAddress)
      let price = data.itemPrice
      price = '' + price
      console.log(price)
      const options = { value: ethers.utils.parseEther(price) }
      // const trancaction = await contract.transferEther(ownerAddress,options)
      // const trancaction = await contract.getBalance()
        const trancaction = await contract.transferEther(ownerAddress,options)
      // const trancaction3 = await contract.withdrawMoney()
      const trancaction2 = await contract.getBalance()
      console.log(trancaction)
      
    }else{
      setErrorMessage("Please Connect to Metamask!!!");
    }

  };

  const checkWalletIsConnected = async () => {
    if (window.ethereum || window.ethereum.isConnected()) {
      const account = await window.ethereum.request({method: "eth_accounts"})
      if (account.length){
        return true;
      }
      else{
          setErrorMessage("Please Connect to Metamask!!!");
          provider.send("eth_requestAccounts", []).then(async () => {
            return true;
          });
          return false;
      }
    } else {
      setErrorMessage("Please Install Metamask!!!");
      return false;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col gap-2 text-center justify-center items-center p-3">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white w-full md:max-w-md rounded-b-md">
              <div className="relative md:h-64 w-full h-full ml-0 mt-0">
                <img
                  src={imageUrl}
                  alt="Product"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="email">Owner: {data.email}</p>
                <p className="item-name">Product-Name: {data.itemName}</p>
                <p className="item-price">Product-Price: {data.itemPrice}</p>
                <p className="item-price">
                  Product-Description: {data.itemDescribe}
                </p>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <Button onClick={handleBack} type="goBack" className="mb-4">
                    👈 Go Back
                  </Button>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={()=>transferProcess()}>
                    Rent this product
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 h-96 bg-[#638ECB] p-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
            <h1 className="text-2xl  tracking-wider relative top-0 font-bold text-[#D5DEEF] text-center">
              Details About The Owner Of This Product
            </h1>
            <div className="text-[#D5DEEF] font-medium text-left tracking-wide">
              <p> This is a Product For Rent From {data.email}. </p>
              <p> This Product is called {data.itemName}. </p>
              <p>
                {" "}
                This Owner is willing to give this Product for the price of{" "}
                {data.itemPrice}.{" "}
              </p>
              <p>
                {" "}
                Detailed Description of this Product: {data.itemDescribe}.{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
