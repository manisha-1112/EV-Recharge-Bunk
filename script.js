const firebaseConfig = {
  apiKey: "AIzaSyDIw-XYZwklxErrER2JcKlExqK17-A2XWU",
  authDomain: "electric-vehicle-recharg-4b712.firebaseapp.com",
  databaseURL: "https://electric-vehicle-recharg-4b712-default-rtdb.firebaseio.com",
  projectId: "electric-vehicle-recharg-4b712",
  storageBucket: "electric-vehicle-recharg-4b712.firebasestorage.app",
  messagingSenderId: "79504782351",
  appId: "1:79504782351:web:2d5d21c37dba746a0e1f7a"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Logging utility function
function log(message, level = "info") {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] ${message}`);
}

// register function
function register() {
  // Get all our input fields
  const name1 = document.getElementById("name1").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;
  const phoneno = document.getElementById("mobile").value;
  const username = document.getElementById("username").value;

  log("Attempting to register user with email: " + email);

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;

      log("User registered successfully. UID: " + user.uid);

      // Add this user to Firebase Database
      const database_ref = database.ref();

      const user_data = {
        email: email,
        username: username,
        address: address,
        phoneno: phoneno
      };

      // Push to Firebase Database
      database_ref.child("Login_users/" + user.uid).set(user_data);

      alert("User Created!!");
      window.location.href = "user_login_page.html";
      log("Redirected to page. Current URL: " + window.location.href);
    })
    .catch(function (error) {
      log("Error during user registration: " + error.message, "error");
      alert(error.message);
    });
}

// login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  log("Attempting to login user with email: " + email);

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;

      log("User logged in successfully. UID: " + user.uid);

      const database_ref = database.ref();

      const user_data = {
        last_login: Date.now()
      };

      database_ref.child("Login_users/" + user.uid).update(user_data);

      alert("User Logged In!!");

      window.location.href = "user_dashboard.html";
      log("Redirected to dashboard. Current URL: " + window.location.href);
    })
    .catch(function (error) {
      log("Error during login: " + error.message, "error");
      alert(error.message);
    });
}
