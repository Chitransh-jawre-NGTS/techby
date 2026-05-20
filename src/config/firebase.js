import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVLnYw9Zx2X5isXLw7COiUvCg_JncgJc8",

  authDomain:
    "techby-c1c81.firebaseapp.com",

  projectId: "techby-c1c81",

  storageBucket:
    "techby-c1c81.firebasestorage.app",

  messagingSenderId: "243559813778",

  appId:
    "1:243559813778:web:4dfeaf9c5d2bcdef77cc4b",

  measurementId: "G-BG6CFBY24L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);

export default app;