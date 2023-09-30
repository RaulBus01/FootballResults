
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBbxizvXs9a4Ua37lHqYh20Mz3wRzu_J8w",
  authDomain: "flashgoal-c7e9d.firebaseapp.com",
  databaseURL: "https://flashgoal-c7e9d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flashgoal-c7e9d",
  storageBucket: "flashgoal-c7e9d.appspot.com",
  messagingSenderId: "145463225187",
  appId: "1:145463225187:web:86e1f37d5ea5c9edaf0156",
  measurementId: "G-V35GXWJDXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export default db;