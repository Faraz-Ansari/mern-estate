// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-45874.firebaseapp.com",
    projectId: "mern-estate-45874",
    storageBucket: "mern-estate-45874.appspot.com",
    messagingSenderId: "556970915582",
    appId: "1:556970915582:web:4acd469ad6fd6e8dbd57af",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
