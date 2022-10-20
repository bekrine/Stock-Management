import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_KEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId:process.env.REACT_APP_FIREBASE_PROJECTID ,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGEBUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
 
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)