import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRT7cxavTc-yuq3hCg-EOTeT-sj7XeGWc",
  authDomain: "bookmate-61d13.firebaseapp.com",
  projectId: "bookmate-61d13",
  storageBucket: "bookmate-61d13.appspot.com",
  messagingSenderId: "45535198543",
  appId: "1:45535198543:web:0854dd4a616d3eb239993a",
  measurementId: "G-E9SB4VH589"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db }