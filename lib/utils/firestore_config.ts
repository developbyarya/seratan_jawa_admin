// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcxPJuj3qT7-MiTd_RA-EaLZwFYxgH0sY",
  authDomain: "seratanjawi.firebaseapp.com",
  projectId: "seratanjawi",
  storageBucket: "seratanjawi.appspot.com",
  messagingSenderId: "197040451030",
  appId: "1:197040451030:web:49c7e73a41d32ae9a64877",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
