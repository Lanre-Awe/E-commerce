import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
import { collection } from "firebase/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

export const db = getFirestore(app);

export const cartCollectionRef = collection(db, "cart-items");

export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth.signOut();
};

export default app;
