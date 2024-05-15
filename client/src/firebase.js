// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestatemarketplace-38d82.firebaseapp.com",
  projectId: "realestatemarketplace-38d82",
  storageBucket: "realestatemarketplace-38d82.appspot.com",
  messagingSenderId: "429424089090",
  appId: "1:429424089090:web:e48b1d4bde1714121daf1b",
  measurementId: "G-6P6SH9JPXY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);