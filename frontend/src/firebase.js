// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAz7A3bsrMvaXpoPuu4ClMXP8aE5Ia7aE",
    authDomain: "hack-23-6cf4b.firebaseapp.com",
    projectId: "hack-23-6cf4b",
    storageBucket: "hack-23-6cf4b.appspot.com",
    messagingSenderId: "864097644652",
    appId: "1:864097644652:web:1eec9bdd17f71d18d56849",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
