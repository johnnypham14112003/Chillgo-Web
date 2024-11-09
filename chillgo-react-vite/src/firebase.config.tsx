// src/firebase.ts
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// URL server từ biến môi trường
const FIREBASE_API = import.meta.env.VITE_FIREBASE_API;
const VITE_FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const firebaseConfig: FirebaseOptions = {
  apiKey: FIREBASE_API,
  //authDomain: "chillgo.travel",
  authDomain: "localhost",
  projectId: VITE_FIREBASE_PROJECT_ID,
  // ... other config options
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);