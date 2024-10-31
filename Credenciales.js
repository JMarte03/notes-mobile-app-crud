// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "app-notas-6c278.firebaseapp.com",
  projectId: "app-notas-6c278",
  storageBucket: "app-notas-6c278.firebasestorage.app",
  messagingSenderId: "878762354404",
  appId: "1:878762354404:web:8d740365c6f9d2f447eef1",
  measurementId: "G-W4LFWQX8C3"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(appFirebase);

export default appFirebase;
