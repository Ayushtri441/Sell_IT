import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyDQJ-lEVObTeU0tMHZqOUKOyOGS5E2fDbk",
    authDomain: "my-olx-mini.firebaseapp.com",
    databaseURL: "https://my-olx-mini-default-rtdb.firebaseio.com",
    projectId: "my-olx-mini",
    storageBucket: "my-olx-mini.appspot.com",
    messagingSenderId: "811770900869",
    appId: "1:811770900869:web:fac06c56975ab00d8694ec",
    measurementId: "G-XVCB8PRS7P"
  };
  export const Firebase= firebase.initializeApp(firebaseConfig)
  const db = getFirestore(Firebase);
  const storage = getStorage(Firebase);
  
  export { db, storage };
  