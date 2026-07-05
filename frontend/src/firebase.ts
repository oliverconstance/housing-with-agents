import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzHUl8K3ByRKBR8syuZPVByHR7jcIE6D0",
  authDomain: "housing-with-agents.firebaseapp.com",
  projectId: "housing-with-agents",
  storageBucket: "housing-with-agents.firebasestorage.app",
  messagingSenderId: "371059929522",
  appId: "1:371059929522:web:f64b24070554eb57b2b4ab",
  measurementId: "G-D4EL509FKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
