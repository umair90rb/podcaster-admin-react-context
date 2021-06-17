import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC5X6FFAjB_vMoIP1OvgS2Dlo4Xe-bALgo",
  authDomain: "comrade-37c8c.firebaseapp.com",
  projectId: "comrade-37c8c",
  storageBucket: "comrade-37c8c.appspot.com",
  messagingSenderId: "342939174536",
  appId: "1:342939174536:web:392d6c3ad7e2af8d80413d",
  measurementId: "G-GPRBC0QMDR",
});

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
export default app;
