// import { initializeApp, getApps } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "REDACTED_FIREBASE_API_KEY",
    authDomain: "leafhealth-tracker.firebaseapp.com",
    projectId: "leafhealth-tracker",
    storageBucket: "leafhealth-tracker.appspot.com",
    messagingSenderId: "590391175083",
    appId: "1:590391175083:web:236d6e34fcbd6ffc3cd4ee"
  };

  // let app;
  // if (getApps().length === 0) {
  //   app = initializeApp(firebaseConfig);
  // }
  
  // export default app;

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };