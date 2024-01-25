import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isSupported, initializeAnalytics,getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6nEX94HF-dz1I-eIHdzcEMBFUh2jRvLI",

  authDomain: "smart-rental-app-main.firebaseapp.com",

  projectId: "smart-rental-app-main",

  storageBucket: "smart-rental-app-main.appspot.com",

  messagingSenderId: "1096111792966",

  appId: "1:1096111792966:web:205f59ec419c0fdedd3b47",

  measurementId: "G-CYW4CLQQQF",
};

// Initialize Firebase'



const app = initializeApp(firebaseConfig);


if (isSupported()) {
  const analytics = initializeAnalytics(app);
}

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);


