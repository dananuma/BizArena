// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGxGJQwmn72djIgUCs8lPyxQb97b3LqUQ",
  authDomain: "bizarena-b324a.firebaseapp.com",
  projectId: "bizarena-b324a",
  storageBucket: "bizarena-b324a.firebasestorage.app",
  messagingSenderId: "1029803354084",
  appId: "1:1029803354084:web:7e9bcc3ad2173eb84d49f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}