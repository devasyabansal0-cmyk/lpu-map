/* =========================================
   LPU SMARTMAP - JAVASCRIPT
========================================= */


/* =========================================
   LOCATION DATA
   Add/change locations after your team
   verifies the actual LPU information.
========================================= */

const locations = [
    {
        name: "Central Library",
        category: "Library",
        description: "LPU Central Library",
        keywords: "library books study",
        lat: 31.25199,
        lng: 75.70367
    },

    {
        name: "Block 18",
        category: "Academic Blocks",
        description: "LPU Academic Block",
        keywords: "block 18 academic",
        lat: 31.25526,
        lng: 75.70335
    },

    {
        name: "Block 38",
        category: "Academic Blocks",
        description: "LPU Academic Block",
        keywords: "block 38 academic",
        lat: 31.25207,
        lng: 75.70330
    },

    {
        name: "LPU Ground",
        category: "Sports",
        description: "Sports Ground",
        keywords: "ground sports",
        lat: 31.25578,
        lng: 75.71037
    }
];


/* =========================================
   ELEMENTS
========================================= */

const searchBox = document.getElementById("searchBox");
const searchForm = document.querySelector("#search form");

const map = document.getElementById("campus-map");

const routeForm = document.querySelector("#navigation form");
const startSelect = document.getElementById("start");
const destinationSelect = document.getElementById("destination");

const routeResult = document.getElementById("route-result");

const locationDetails =
    document.querySelector(".location-card");

const placeContainer =
    document.querySelector(".places-container");

const categoryButtons =
    document.querySelectorAll(".category-container button");


/* =========================================
   CREATE MAP
========================================= */

function createMap() {

    const campusMap = L.map("campus-map").setView(
        [31.2534, 75.7035],
        16
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(campusMap);

    L.marker([31.25492, 75.70462])
    .addTo(campusMap)
    .bindPopup("<b>LPU Campus</b><br>Lovely Professional University");

L.marker([31.25199, 75.70367])
    .addTo(campusMap)
    .bindPopup("<b>Central Library</b><br>LPU Central Library");

L.marker([31.25526, 75.70335])
    .addTo(campusMap)
    .bindPopup("<b>Block 18</b><br>LPU Academic Block");

L.marker([31.25207, 75.70330])
    .addTo(campusMap)
    .bindPopup("<b>Block 38</b><br>LPU Academic Block");

L.marker([31.25578, 75.71037])
    .addTo(campusMap)
    .bindPopup("<b>LPU Ground</b><br>Sports Ground");
}


/* =========================================
   DISPLAY LOCATION DETAILS
========================================= */

function showLocation(location) {

    locationDetails.innerHTML = `
        <h3>${location.name}</h3>

        <p>
            <strong>Category:</strong>
            ${location.category}
        </p>

        <p>
            <strong>Description:</strong>
            ${location.description}
        </p>

        <button onclick="highlightLocation('${location.name}')">
            Show on Map
        </button>
    `;

    highlightLocation(location.name);
}


/* =========================================
   SHOW LOCATION ON MAP
========================================= */

function highlightLocation(name) {

    map.innerHTML = `
        <div class="map-location">
            <div class="map-pin">📍</div>

            <h3>${name}</h3>

            <p>
                Location selected
            </p>
        </div>
    `;

    map.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================================
   SEARCH LOCATION
========================================= */

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const searchText = searchBox.value.toLowerCase().trim();

    const location = locations.find(function(place) {
        return place.name.toLowerCase().includes(searchText) ||
               place.category.toLowerCase().includes(searchText) ||
               place.keywords.toLowerCase().includes(searchText);
    });

    if (location) {
        showLocation(location);
        highlightLocation(location);
    } else {
        alert("Location not found. Try searching for Library, Block 18, Block 38, etc.");
    }
});


//     if (result) {

//         showLocation(result);

//     } else {

//         locationDetails.innerHTML = `
//             <h3>Location Not Found</h3>

//             <p>
//                 Sorry, we couldn't find
//                 "${searchBox.value}".
//             </p>

//             <p>
//                 Try searching for Block 32,
//                 Library, Hostel or Food Court.
//             </p>
//         `;

//     }

// ;


/* =========================================
   DISPLAY ALL PLACES
========================================= */

function displayPlaces(list) {

    placeContainer.innerHTML = "";

    list.forEach(location => {

        const card =
            document.createElement("article");

        card.className = "place-card";

        card.innerHTML = `
            <h3>${location.name}</h3>

            <p>
                ${location.description}
            </p>

            <p>
                <strong>Category:</strong>
                ${location.category}
            </p>

            <button>
                View Location
            </button>
        `;

        const button =
            card.querySelector("button");

        button.addEventListener("click", function() {

            showLocation(location);

        });

        placeContainer.appendChild(card);

    });

}


/* =========================================
   CATEGORY FILTER
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", function() {

        const category =
            button.textContent.trim();

        const filtered =
            locations.filter(location =>
                location.category === category
            );

        if (filtered.length > 0) {

            displayPlaces(filtered);

            document
                .getElementById("places")
                .scrollIntoView({
                    behavior: "smooth"
                });

        } else {

            alert(
                "Locations for this category will be added soon."
            );

        }

    });

});


/* =========================================
   ROUTE FINDER
========================================= */
if (routeForm) {
routeForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const start = startSelect.value;

    const destination =
        destinationSelect.value;


    if (start === "" || destination === "") {

        routeResult.innerHTML = `
            <p>
                ⚠️ Please select both
                starting location and destination.
            </p>
        `;

        return;
    }


    if (start === destination) {

        routeResult.innerHTML = `
            <p>
                📍 You are already at your
                selected destination.
            </p>
        `;

        return;
    }


    const startName =
        startSelect.options[
            startSelect.selectedIndex
        ].text;

    const destinationName =
        destinationSelect.options[
            destinationSelect.selectedIndex
        ].text;


    routeResult.innerHTML = `
        <h3>Route Found</h3>

        <p>
            📍 <strong>From:</strong>
            ${startName}
        </p>

        <p>
            🎯 <strong>To:</strong>
            ${destinationName}
        </p>

        <p>
            🚶 Your route will be displayed
            on the campus map.
        </p>

        <button onclick="showRoute('${startName}', '${destinationName}')">
            View Route
        </button>
    `;

});
}


/* =========================================
   SHOW ROUTE
========================================= */

function showRoute(start, destination) {

    map.innerHTML = `
        <div class="map-location">

            <div class="map-pin">
                📍
            </div>

            <h3>
                ${start}
                →
                ${destination}
            </h3>

            <p>
                🛣️ Route selected
            </p>

            <p>
                Detailed navigation will be
                displayed here.
            </p>

        </div>
    `;

    map.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   EXPLORE CAMPUS BUTTON
========================================= */

const exploreButton =
    document.querySelector(
        ".home-content button"
    );

exploreButton.addEventListener("click", function() {

    document
        .getElementById("map")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   INITIALIZE WEBSITE
========================================= */

createMap();

displayPlaces(locations);

console.log("LPU SmartMap loaded successfully!");