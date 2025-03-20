// Import Firebase functies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuratie
const firebaseConfig = {
  apiKey: "AIzaSyDkq01jGmQxHy5ftZMwlmakSn5xJTCYmzM",
  authDomain: "persoonlijke-voetafdruk.firebaseapp.com",
  projectId: "persoonlijke-voetafdruk",
  storageBucket: "persoonlijke-voetafdruk.appspot.com",
  messagingSenderId: "289072544376",
  appId: "1:289072544376:web:b2b16646415126c9f20b8d",
  measurementId: "G-K7D6SG895T"
};

// Firebase initialiseren
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP); // Zorg dat deze regel er staat!

// Exporteer Firebase objecten
export { FIREBASE_APP, FIREBASE_AUTH };

