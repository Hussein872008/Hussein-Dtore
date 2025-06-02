// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVVWAIGkqAZPQ6gZBEOr6zwUN0Huq70c4",
  authDomain: "hussein-store-a36f1.firebaseapp.com",
  projectId: "hussein-store-a36f1",
  storageBucket: "hussein-store-a36f1.firebasestorage.app",
  messagingSenderId: "313448199340",
  appId: "1:313448199340:web:2cb83a599a88cb54b65b09",
  measurementId: "G-61C9G0PWRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export the services you want to use
export { auth, app };