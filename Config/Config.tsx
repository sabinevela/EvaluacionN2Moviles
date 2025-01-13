import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3tSQJFtwhWSaiAOZ8LXjjTQzCKhqnIGY",
  authDomain: "sv-prueba-e90b0.firebaseapp.com",
  projectId: "sv-prueba-e90b0",
  storageBucket: "sv-prueba-e90b0.firebasestorage.app",
  messagingSenderId: "210602983131",
  appId: "1:210602983131:web:83fc0c29de7a486e5396fe",
  measurementId: "G-24XQ2B5W5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db
export const auth = getAuth(app);
export const db = getDatabase(app);
