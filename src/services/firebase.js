import { initializeApp } from "firebase/app";

import { addDoc, getFirestore, collection } from 'firebase/firestore'
import { FormText } from "react-bootstrap";
import ItemData from "../data/data";

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

export async function saveProductosToFirebase(){
  
  const collectionMovies = collection(firestoreDB, "movies")

  for(let item of ItemData){
    const docref = await addDoc (collectionMovies, item)
    console.log(docref)
  }
}

export default firestoreDB;