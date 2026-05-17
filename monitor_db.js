require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, onSnapshot } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Monitoring Firestore 'users' collection for new signups...");

onSnapshot(collection(db, "users"), (snapshot) => {
  console.log(`\n--- Database Update at ${new Date().toLocaleTimeString()} ---`);
  if (snapshot.empty) {
    console.log("The 'users' collection is currently empty.");
  } else {
    snapshot.forEach(doc => {
      console.log(`[User ID: ${doc.id}] =>`, doc.data());
    });
  }
}, (error) => {
  console.error("Error monitoring database. Make sure Firestore is enabled and permissions allow reading:", error.message);
});
