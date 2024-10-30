import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig1 = {
  
};

const firebaseConfig2 = {
  
};

const app1 = initializeApp(firebaseConfig1, 'app1');
const app2 = initializeApp(firebaseConfig2, 'app2');
export const auth = getAuth(app1);
export const firestoredb = getFirestore(app2);
