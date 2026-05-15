// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWY8qPvMSm5syRel4zBuA0hbgOog8rLeQ",
  authDomain: "student-management-9dfb4.firebaseapp.com",
  projectId: "student-management-9dfb4",
  storageBucket: "student-management-9dfb4.firebasestorage.app",
  messagingSenderId: "334016888919",
  appId: "1:334016888919:web:e93f20168cf68f5c3de312",
  measurementId: "G-0L7FNLQ8NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
