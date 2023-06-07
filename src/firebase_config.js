import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBw8dDOh-UecI5d84-DTL4Qx2K78ocUKkw",
  authDomain: "todofirebaseapp-cbe8c.firebaseapp.com",
  projectId: "todofirebaseapp-cbe8c",
  storageBucket: "todofirebaseapp-cbe8c.appspot.com",
  messagingSenderId: "528624271972",
  appId: "1:528624271972:web:3a11c61a55c736e35b9571"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Use these for db
const db = firebaseApp.firestore();
export { db };