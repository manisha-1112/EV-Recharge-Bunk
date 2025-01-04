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
  
const database = firebase.database();
  
var bunkTableBody = document.getElementById("bunk-table-body");
  
  // Logger function
function log(message, level = "info") {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] ${message}`);
}
  
  // Function to delete a row
function deleteRow(id) {
    var ref = database.ref("bunks/" + id);
    log(`Attempting to delete bunk with ID: ${id}`);
    ref.remove()
      .then(function () {
        var row = document.getElementById(id);
        row.parentNode.removeChild(row);
        log(`Successfully deleted bunk with ID: ${id}`);
      })
      .catch(function (error) {
        log(`Error deleting bunk with ID: ${id}. Error: ${error.message}`, "error");
      });
}
  
  // Listener for added bunks
database.ref("bunks").on("child_added", function (snapshot) {
    var location = snapshot.val().location;
    var area = snapshot.val().area;
    var slots = snapshot.val().slots;
    var phone = snapshot.val().phone;
    var capacity = snapshot.val().capacity;
    var minChargeTime = snapshot.val().minChargeTime;
    var id = snapshot.key;
  
    log(`New bunk added to database with ID: ${id}`);
  
    var row = bunkTableBody.insertRow();
    row.id = id;
  
    var locationCell = row.insertCell(0);
    var areaCell = row.insertCell(1);
    var slotsCell = row.insertCell(2);
    var phoneCell = row.insertCell(3);
    var capacityCell = row.insertCell(4);
    var minChargeTimeCell = row.insertCell(5);
    var deleteCell = row.insertCell(6);
  
    locationCell.innerText = location;
    areaCell.innerText = area;
    slotsCell.innerText = slots;
    phoneCell.innerText = phone;
    capacityCell.innerText = capacity;
    minChargeTimeCell.innerText = minChargeTime;
    deleteCell.innerHTML =
      "<button onclick=\"deleteRow('" + id + "')\">Delete</button>";
  
    log(`Bunk data added to table: 
      Location=${location}, 
      Area=${area}, 
      Slots=${slots}, 
      Phone=${phone}, 
      Capacity=${capacity}, 
      MinChargeTime=${minChargeTime}`);
});
  