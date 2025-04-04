import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQToMWyQu0RNTCxfmxM9YkBAvRbPfyJfo",
  authDomain: "resume-ninja-portal.firebaseapp.com",
  projectId: "resume-ninja-portal",
  storageBucket: "resume-ninja-portal.firebasestorage.app",
  messagingSenderId: "462781364647",
  appId: "1:462781364647:web:7e5f3116ebaf8705925e82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;