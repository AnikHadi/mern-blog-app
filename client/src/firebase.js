// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c8de9.firebaseapp.com",
  projectId: "mern-blog-c8de9",
  storageBucket: "mern-blog-c8de9.firebasestorage.app",
  messagingSenderId: "520132992870",
  appId: "1:520132992870:web:a5e04d592433837f84b2a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
