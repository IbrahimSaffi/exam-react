
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBntlueoAJI7Q9ZgieNIg55IYQ_Xs6q18k",
  authDomain: "react-exam-4222d.firebaseapp.com",
  projectId: "react-exam-4222d",
  storageBucket: "react-exam-4222d.appspot.com",
  messagingSenderId: "797560461997",
  appId: "1:797560461997:web:a2821598b3db3f74c74424"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//google atuntication
const auth = getAuth(app)
//realtime database
const rtDatabase = getDatabase();
//firestore database
const fsDatabase = getFirestore(app)
export {auth,fsDatabase,rtDatabase}