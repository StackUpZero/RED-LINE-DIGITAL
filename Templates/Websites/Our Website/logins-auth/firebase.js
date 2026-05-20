// Import Firebase tools from Google's CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your Firebase project settings
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5sF9vV21tRPfynNIbnQWAmjuBPj1IlQk",
  authDomain: "red-line-digital.firebaseapp.com",
  projectId: "red-line-digital",
  storageBucket: "red-line-digital.firebasestorage.app",
  messagingSenderId: "693566593434",
  appId: "1:693566593434:web:a72ca272f9798c82464223",
  measurementId: "G-Y0Z1MLE6K9"
};

// Start Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services so other files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);