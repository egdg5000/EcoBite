// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkq01jGmQxHy5ftZMwlmakSn5xJTCYmzM",
  authDomain: "persoonlijke-voetafdruk.firebaseapp.com",
  projectId: "persoonlijke-voetafdruk",
  storageBucket: "persoonlijke-voetafdruk.firebasestorage.app",
  messagingSenderId: "289072544376",
  appId: "1:289072544376:web:b2b16646415126c9f20b8d",
  measurementId: "G-K7D6SG895T"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth (FIREBASE_APP);
export const FIREBASE_DB = getFirestore (FIREBASE_APP);