import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIw-XYZwklxErrER2JcKlExqK17-A2XWU",
  authDomain: "electric-vehicle-recharg-4b712.firebaseapp.com",
  databaseURL: "https://electric-vehicle-recharg-4b712-default-rtdb.firebaseio.com",
  projectId: "electric-vehicle-recharg-4b712",
  storageBucket: "electric-vehicle-recharg-4b712.firebasestorage.app",
  messagingSenderId: "79504782351",
  appId: "1:79504782351:web:2d5d21c37dba746a0e1f7a"
};

// Logging utility function
function log(message, level = "info") {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] ${message}`);
}

// Initialize Firebase
log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
log("Firebase initialized successfully.");

// Initialize Database
log("Initializing Firebase Realtime Database...");
const database = getDatabase(app);
log("Firebase Realtime Database initialized successfully.");

// Export the database object
log("Exporting the database object...");
export { database };
log("Database object exported.");



