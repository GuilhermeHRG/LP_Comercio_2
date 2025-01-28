// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfDyT7cyFfQtT3xw03F_Fn2xbkpQSw-j0",
  authDomain: "lp-comercio-miriany.firebaseapp.com",
  projectId: "lp-comercio-miriany",
  storageBucket: "lp-comercio-miriany.firebasestorage.app",
  messagingSenderId: "310421640309",
  appId: "1:310421640309:web:85cc3da3dc7b3576b6943c",
  measurementId: "G-7MC7QBT2ER"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializa o Firestore
const auth = getAuth(app); // Inicializa o Auth

// Exporta as variáveis que você precisa
export { db, analytics, auth };  // Agora também exporta o storage
