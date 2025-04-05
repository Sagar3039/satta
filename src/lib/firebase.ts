// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQToMWyQu0RNTCxfmxM9YkBAvRbPfyJfo",
  authDomain: "resume-ninja-portal.firebaseapp.com",
  projectId: "resume-ninja-portal",
  storageBucket: "resume-ninja-portal.firebasestorage.app",
  messagingSenderId: "462781364647",
  appId: "1:462781364647:web:7e5f3116ebaf8705925e82"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
