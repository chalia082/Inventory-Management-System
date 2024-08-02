require('dotenv').config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM3mG1qMFpbNPTwpXS0OZe4SzzXenCYKk",
  authDomain: "dcpantryapp.firebaseapp.com",
  projectId: "dcpantryapp",
  storageBucket: "dcpantryapp.appspot.com",
  messagingSenderId: "168113441178",
  appId: "1:168113441178:web:16505fd7706dc1d2fa5223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore}