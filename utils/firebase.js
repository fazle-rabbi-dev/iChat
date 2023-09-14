import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const apiKey = process.env.NEXT_PUBLIC_apiKey
const messagingSenderId = process.env.NEXT_PUBLIC_messagingSenderId
const appId = process.env.NEXT_PUBLIC_appId

const firebaseConfig = {
  apiKey,
  authDomain: "ichat-1343.firebaseapp.com",
  projectId: "ichat-1343",
  storageBucket: "ichat-1343.appspot.com",
  messagingSenderId,
  appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;