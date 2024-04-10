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

  const searchParams = useSearchParams();

  const p_id = searchParams.get("itemId");
  // console.log("param: ",p_id);

  const router = useRouter();

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
    <div className="max-w-md mx-auto mb-96 mt-14 text-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
        <div className="mb-4">
          <p className="text-xl font-semibold">Product Name: {data.itemName}</p>
          <p className="text-gray-600">
            Product Description: {data.itemDescribe}
          </p>
          <p className="text-gray-600">Product Price: {data.itemPrice}</p>
        </div>
        {!errorMessage ? (
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button onClick={handleBack} type="goBack" className="mb-4">
            👈 Go Back
          </Button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={()=>transferProcess()}>
            Rent this product
          </button>
          </div>
        ): errorMessage }
      </div>
    </div>
  );
};

export default page;
