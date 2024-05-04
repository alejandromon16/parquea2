// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCnOFmJVZbfaFJ7NyKx4d4QEG0G8xc7KkU",
  authDomain: "atrevet-parquea2.firebaseapp.com",
  projectId: "atrevet-parquea2",
  storageBucket: "atrevet-parquea2.appspot.com",
  messagingSenderId: "665176182069",
  appId: "1:665176182069:web:6871d046efc656d0bb507c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);