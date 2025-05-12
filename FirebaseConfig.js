
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);