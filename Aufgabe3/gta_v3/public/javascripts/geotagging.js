// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

// Here the API used for geolocations is selected
// The following declaration is a 'mockup' that always works and returns a fixed position.
var GEOLOCATION_API = {
    getCurrentPosition: function(onsuccess) {
        onsuccess({
            "coords": {
                "latitude": 49.013790,
                "longitude": 8.390071,
                "altitude": null,
                "accuracy": 39,
                "altitudeAccuracy": null,
                "heading": null,
                "speed": null
            },
            "timestamp": 1775140116396
        });
    }
};

// This is the real API.
// If there are problems with it, comment out the line.
GEOLOCATION_API = navigator.geolocation;


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation(){
    const latInput = document.getElementById("tag-form-latitude").value;
    const lonInput = document.getElementById("tag-form-longitude").value;

    const mapDiv = document.getElementById("map");
    const tagsJson = mapDiv.getAttribute("data-tags");
    
    let tags = [];
    if (tagsJson) {
        tags = JSON.parse(tagsJson);
    }

    if (latInput && latInput.trim() !== "" && lonInput && lonInput.trim() !== "") {
        const location = {
            latitude: parseFloat(latInput),
            longitude: parseFloat(lonInput)
        };
        renderMap(location, tags);
    } else {
        LocationHelper.findLocation((location) => {
            document.getElementById("tag-form-latitude").value = location.latitude;
            document.getElementById("tag-form-longitude").value = location.longitude;
            document.getElementById("discoveryFilterForm-latitude").value = location.latitude;
            document.getElementById("discoveryFilterForm-longitude").value = location.longitude;
            
            renderMap(location, tags);
        });
    }
}

function renderMap(location, tags) {
    const div = document.getElementById("map");   
    const img = div.querySelector("img");
    const span = div.querySelector("span");
    if (img) img.remove();
    if (span) span.remove();
 
    const map = new MapManager();
    map.initMap(location.latitude, location.longitude);
    map.updateMarkers(location.latitude, location.longitude, tags);
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation()
});