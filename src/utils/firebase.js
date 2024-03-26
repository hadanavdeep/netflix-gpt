// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZFVc-i-Sa2i711rhVpH0IiQPdxQcqdho",
  authDomain: "netflixgpt-ef145.firebaseapp.com",
  projectId: "netflixgpt-ef145",
  storageBucket: "netflixgpt-ef145.appspot.com",
  messagingSenderId: "536912993212",
  appId: "1:536912993212:web:10f240fd74c9157e83e9b9",
  measurementId: "G-64LY2CC9FR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
