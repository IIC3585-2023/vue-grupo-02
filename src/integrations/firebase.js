import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1G3dhDXR6fIDhCFaY-Drew_H22_USAjA",
  authDomain: "tarea-5-645ed.firebaseapp.com",
  projectId: "tarea-5-645ed",
  storageBucket: "tarea-5-645ed.appspot.com",
  messagingSenderId: "827077728066",
  appId: "1:827077728066:web:1cf3de403bdaa3f9bb5adb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;