
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCJMErXN_nK-lptXSkDzz87wPvF6gqKM0Q",
  authDomain: "tisfoullachat.firebaseapp.com",
  projectId: "tisfoullachat",
  storageBucket: "tisfoullachat.appspot.com",
  messagingSenderId: "14041161076",
  appId: "1:14041161076:web:cc59056327de29c9d62021",
  measurementId: "G-TL74QSLLCL"
};
export const  app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);