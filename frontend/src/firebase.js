// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZLH4dzUzB5XAGwiHXgi3BOrip4B0eIxg",
    authDomain: "hack-23-2.firebaseapp.com",
    projectId: "hack-23-2",
    storageBucket: "hack-23-2.appspot.com",
    messagingSenderId: "999252615502",
    appId: "1:999252615502:web:f0fb85498831484144fe1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
