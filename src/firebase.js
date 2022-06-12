import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./secret";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);

export let auth = getAuth(app);
export let db = getFirestore(app);
