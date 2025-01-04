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

log("Initializing Firebase...");
firebase.initializeApp(firebaseConfig);
log("Firebase initialized successfully.");

const database = firebase.database();

log("Parsing URL parameters...");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
log(`Extracted bunk ID: ${id}`);

log("Fetching bunk details from the database...");
database.ref('bunks/' + id).once('value', function (snapshot) {
    if (snapshot.exists()) {
        const location = snapshot.val().location;
        const area = snapshot.val().area;
        const slots = snapshot.val().slots;
        const phone = snapshot.val().phone;
        const capacity = snapshot.val().capacity;
        const minChargeTime = snapshot.val().minChargeTime;

        log("Bunk details fetched successfully:");
        log(`Location: ${location}`);
        log(`Area: ${area}`);
        log(`Slots: ${slots}`);
        log(`Phone: ${phone}`);
        log(`Capacity: ${capacity}`);
        log(`Minimum Charge Time: ${minChargeTime}`);
    } else {
        log("No data found for the given ID.", "warn");
    }
});

function updateBunk(event) {
    event.preventDefault();
    log("Updating bunk details...");

    const location = document.getElementById('location').value;
    const area = document.getElementById('area').value;
    const slots = document.getElementById('slots').value;
    const phone = document.getElementById('phone').value;
    const capacity = document.getElementById('capacity').value;
    const minChargeTime = document.getElementById('minChargeTime').value;

    if (!location || !area || !slots || !phone || !capacity || !minChargeTime) {
        alert("Please fill in all fields before updating.");
        return;
      }

    const updates = {
        location: location,
        area: area,
        slots: slots,
        phone: phone,
        capacity: capacity,
        minChargeTime: minChargeTime
    };

    log("Prepared updates:", "info");
    console.log(updates);

database.ref('bunks/' + id).update(updates)
        .then(() => {
            log("Bunk details updated successfully.");
            alert("Bunk updated successfully!");
            log("Redirecting to manage_slots.html...");
            window.location.href = 'manage_slots.html';
        })
        .catch((error) => {
            log(`Error updating bunk details: ${error.message}`, "error");
            alert("Failed to update bunk details. Please try again.");
        });
}
