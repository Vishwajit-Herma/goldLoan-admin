import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig1 = {
  apiKey: "AIzaSyBloTqs7q5RjzATueQnn22OvNgdm7BVV4o",
  authDomain: "gold-loan-admin.firebaseapp.com",
  projectId: "gold-loan-admin",
  storageBucket: "gold-loan-admin.appspot.com",
  messagingSenderId: "450868328140",
  appId: "1:450868328140:web:1dfa40099c23cb508db469"
};

const firebaseConfig2 = {
  apiKey: "AIzaSyAR2mw6erM0zEJp6xEGRn6Q_KrTriEYix4",
  authDomain: "goldloan-dbe36.firebaseapp.com",
  projectId: "goldloan-dbe36",
  storageBucket: "goldloan-dbe36.appspot.com",
  messagingSenderId: "242296268770",
  appId: "1:242296268770:web:49b0a56cc9697bdf6a7bbb"
};

const app1 = initializeApp(firebaseConfig1, 'app1');
const app2 = initializeApp(firebaseConfig2, 'app2');
export const auth = getAuth(app1);
export const firestoredb = getFirestore(app2);