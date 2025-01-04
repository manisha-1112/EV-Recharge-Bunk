// Firebase configuration
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

const auth = firebase.auth()
const database = firebase.database()

// Logger function
function log(message, level = "info") {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] ${message}`);
}

// Set up our register function
function register () {
  // Get all our input fields
  name1 = document.getElementById('name1').value;
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  address = document.getElementById('address').value
  phoneno = document.getElementById('mobile').value
  username = document.getElementById('username').value

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare Admin variable
    var user = auth.currentUser
   
    var database_ref = database.ref()
    
    // Create Admin data
var user_data = {
    email : email,
    username : username,
    address : address,
    phoneno : phoneno,
}
    
    // Push to Firebase Database
database_ref.child('Admin_users/' + user.uid).set(user_data)
    log("Admin created successfully with UID: " + user.uid);
    alert('Admin Created!!')
    window.location.href = "Admin_login_page.html";
    log("Redirected to page. Current URL: " + window.location.href);
})
.catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    console.log(error_code)
    console.log(error_message)
    log("Error during registration: " + error.message, "error");
    alert(error_message)
})  
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

auth.signInWithEmailAndPassword(email, password)
.then(function() {
  // Declare Admin variable
  var user = auth.currentUser
  
  var database_ref = database.ref()
      
    // Push to Firebase Database
database_ref.child('Admin_users/' + user.uid)
    log("Admin logged in successfully: " + user.uid);
    alert('Admin Logged In!!')
    window.open('Admin_Dashboard.html');   
})
.catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message
    
    console.log(error_code);
    console.log(error_message);
    log("Error during login: " + error.message, "error");
    alert(error_message)
  })
}
function addFormData() {
  // Get input values
  var location = document.getElementById("bunk-location").value;
  var area = document.getElementById("bunk-area").value;
  var slots = document.getElementById("NoofSlots").value;
  var phone = document.getElementById("phoneno").value;
  var capacity = document.getElementById("slot-capacity").value;
  var minChargeTime = document.getElementById("min-charge-time").value;

  // Validate fields
  if (!location || !area || !slots || !phone || !capacity || !minChargeTime) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Prepare data object
  const bunkData = {
    location,
    area,
    slots,
    phone,
    capacity,
    minChargeTime,
  };

  console.log("Attempting to push data to Firebase:", bunkData);

  // Push data to Firebase and handle the response
  database
    .ref("bunks")
    .push(bunkData)
    .then(() => {
      console.log("Data successfully added to Firebase.");
      alert("Bunk created successfully!");
      window.location.href = "Admin_Dashboard.html";
    })
    .catch((error) => {
      console.error("Error while adding data to Firebase:", error);
      alert("Failed to create bunk details. Error: " + error.message);
    });
}

// Monitor data from the database 
database.ref("bunks").on("child_added", function (snapshot) {
  var location = snapshot.val().location;
  var area = snapshot.val().area;
  var slots = snapshot.val().slots;
  var phone = snapshot.val().phone;
  var capacity = snapshot.val().capacity;
  var minChargeTime = snapshot.val().minChargeTime;

  console.log("New bunk added:", {
    location,
    area,
    slots,
    phone,
    capacity,
    minChargeTime,
  });
});













































