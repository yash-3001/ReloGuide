// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSD7SpOsCK8JembmS9Pf-Cy95dCxXc_Rw",
  authDomain: "realtor-c1d73.firebaseapp.com",
  projectId: "realtor-c1d73",
  storageBucket: "realtor-c1d73.appspot.com",
  messagingSenderId: "647444282550",
  appId: "1:647444282550:web:f0f6e3141678e2072efa17",
  measurementId: "G-FJ3R7ZC8HQ"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
export const db=getFirestore()