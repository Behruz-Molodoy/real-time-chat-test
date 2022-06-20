import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIAljgaMRXLmCKUxTdelZ2fRlc9N8BsiM",
  authDomain: "tutorial-cf0a5.firebaseapp.com",
  projectId: "tutorial-cf0a5",
  storageBucket: "tutorial-cf0a5.appspot.com",
  messagingSenderId: "186045475154",
  appId: "1:186045475154:web:0d3931ee352f6e5f45b28b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app);