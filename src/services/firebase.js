import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAyUGuLaWAPDQ40-U36wJSINm-Y7OWJSn8",
  authDomain: "creaciones-janita.firebaseapp.com",
  projectId: "creaciones-janita",
  storageBucket: "creaciones-janita.appspot.com",
  messagingSenderId: "339890781103",
  appId: "1:339890781103:web:40f64865c8784564d54d5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDB = getFirestore(app)

export default firestoreDB;