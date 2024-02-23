// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "resume-portfolio-894b2.firebaseapp.com",
  projectId: "resume-portfolio-894b2",
  storageBucket: "resume-portfolio-894b2.appspot.com",
  messagingSenderId: "839386652815",
  appId: "1:839386652815:web:54d8ce781e802836c950fa",
  measurementId: "G-ZVV4WJNM3B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
