import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig1 = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY1,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN1,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID1,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET1,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID1,
  appId: import.meta.env.VITE_FIREBASE_APP_ID1,
};

const firebaseConfig2 = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app1 = initializeApp(firebaseConfig1, 'app1');
const app2 = initializeApp(firebaseConfig2, 'app2');
export const auth = getAuth(app1);
export const firestoredb = getFirestore(app2);

