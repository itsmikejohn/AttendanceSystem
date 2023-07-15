
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeANLBVVa2T4PJA2Q9U49_vTK9RiptPwY",
  authDomain: "attendancesystem-70549.firebaseapp.com",
  projectId: "attendancesystem-70549",
  storageBucket: "attendancesystem-70549.appspot.com",
  messagingSenderId: "496996270629",
  appId: "1:496996270629:web:0b6e7eeba17cff92cf75cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { writable } from "svelte/store";

export const auth = writable(getAuth(app));
export const db = writable(getFirestore(app));
export const storage = writable(getStorage(app));