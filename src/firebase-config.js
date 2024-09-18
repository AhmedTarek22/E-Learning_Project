// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // for storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhqVVq4Yf181EWAmstTO1JpD_mE7kfKWA",
  authDomain: "e-learning-site-f2004.firebaseapp.com",
  projectId: "e-learning-site-f2004",
  storageBucket: "e-learning-site-f2004.appspot.com",
  messagingSenderId: "625761967306",
  appId: "1:625761967306:web:b14e7d88433041ede56833",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// don't forget to import it inside sign in or sign up pages
