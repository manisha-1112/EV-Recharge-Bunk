import { database } from './sdk.js';
import { ref, query, orderByChild, onValue, get, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Logging utility
function log(message, level = "info") {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] ${message}`);
}

// Function to search and display bunks
function searchBunks() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput || !searchInput.value) {
        log("Search input is empty. Prompting user to enter a location.", "warn");
        alert('Please enter a location to search.');
        return;
    }

    const searchQuery = searchInput.value.trim().toLowerCase();
    const tableBody = document.getElementById('bunk-details');

    log(`Search Query: ${searchQuery}`);

    const bunksRef = ref(database, 'bunks/');
    const bunksQuery = query(bunksRef, orderByChild('location'));

    log("Querying database for bunks...");
    onValue(bunksQuery, (snapshot) => {
        tableBody.innerHTML = '';
        if (snapshot.exists()) {
            const allBunks = snapshot.val();
            const filteredData = Object.entries(allBunks)
                .map(([key, value]) => ({ key, ...value }))
                .filter(bunk => bunk.location?.toLowerCase().includes(searchQuery));

            log(`Number of matching bunks found: ${filteredData.length}`);
            if (filteredData.length > 0) {
                filteredData.forEach(bunk => {
                    const row = `
                        <tr>
                            <td>${bunk.area}</td>
                            <td>${bunk.phone || 'N/A'}</td>
                            <td><a href="https://www.google.com/maps/search/?api=1&query=${bunk.location}" target="_blank">View on Map</a></td>
                            <td>${bunk.slots || 'N/A'}</td>
                            <td>
                                <a href="#" class="view-slots-link" ><button onclick="bookSlot('${bunk.key}')">Click</button></a>
                            </td>
                        </tr>
                    `;
                    tableBody.insertAdjacentHTML('beforeend', row);

                    // Add marker to the map
                    if (bunk.latitude && bunk.longitude) {
                        L.marker([bunk.latitude, bunk.longitude])
                            .addTo(map)
                            .bindPopup(`<strong>${bunk.location}</strong><br>${bunk.area}`);
                    }
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="5">No results found.</td></tr>';
            }
        } else {
            log("No bunks data found in the database.", "warn");
            tableBody.innerHTML = '<tr><td colspan="5">No data found.</td></tr>';
        }
    }, (error) => {
        log(`Error fetching data: ${error.message}`, "error");
        alert('An error occurred while searching. Please try again.');
    });
}

// Function to book a slot and update the database
function bookSlot(bunkKey) {
    log(`Booking a slot for bunkKey: ${bunkKey}`);
    const slotRef = ref(database, `bunks/${bunkKey}/slots`);

    get(slotRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                log("Slot not found for the given bunkKey.", "warn");
                alert('Slot not found.');
                return;
            }

            let currentSlots = snapshot.val();
            log(`Current slots available: ${currentSlots}`);

            if (currentSlots > 0) {
                const updatedSlots = currentSlots - 1;

                set(slotRef, updatedSlots)
                    .then(() => {
                        log("Slot successfully booked. Remaining slots updated in the database.");
                        alert('Slot successfully booked!');
                        searchBunks(); // Refresh the search results
                    })
                    .catch((error) => {
                        log(`Error updating slot: ${error.message}`, "error");
                        alert('An error occurred while booking the slot. Please try again.');
                    });
            } else {
                log("No slots available to book.", "warn");
                alert('No slots available to book.');
            }
        })
        .catch((error) => {
            log(`Error fetching slot data: ${error.message}`, "error");
            alert('An error occurred. Please try again.');
        });
}
// Add functions to the global `window` object
window.searchBunks = searchBunks;
window.bookSlot = bookSlot;
