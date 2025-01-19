// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8i55JenUfOXhp3QeEHRt-thSsdnCB3p0",
  authDomain: "ai-trip-planner-48d0c.firebaseapp.com",
  projectId: "ai-trip-planner-48d0c",
  storageBucket: "ai-trip-planner-48d0c.firebasestorage.app",
  messagingSenderId: "1027979450795",
  appId: "1:1027979450795:web:c76d6bf691403cb3c91aee",
  measurementId: "G-GR4YXJZJKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)