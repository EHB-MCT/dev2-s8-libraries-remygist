"use strict";

// de leaflet library is reeds geimporteerd, en beschikbaar als "L"
// dit via de script en css tag in de index.html, en de "map" div die werd toegevoegd.
const posX = 50.8460299;
const posY = 4.3294649;
const posXMarker = 50.8422234;
const posYMarker = 4.322681;

const app = {
    position: [],
    map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
    init() {
        // initialise de kaart
        app.map = L.map('map').setView([posX, posY], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(app.map);

        // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
        // vergeet openstreetmap attributie niet

        // gebruik de functie "loadMarkers" om de markers toe te voegen
    },
    loadMarkers() {

        // fetch de data van opendata.brussels.be
        fetch('https://opendata.brussels.be/api/v2/catalog/datasets/haltes-mivb/records?limit=100&offset=0&timezone=UTC')
        .then(function (response) {
          return response.json();
        })
        .then(function (mapData) {
          mapData.records.forEach(function (record) {
            const coordinates = record.record.fields.coordinates;
            const name = record.record.fields.name;
            console.log(coordinates);
            console.log(name);
            //app.position.push(coordinates);
            app.addMarker(coordinates.lat,coordinates.lon,name);

        });
    })
        
        // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart


    },
    addMarker(lat, lon, name) {
        // voeg een marker toe op lat, lon
        L.marker([lat, lon]).addTo(app.map)
            .bindPopup(name)
            .openPopup();
            
  }
}

app.init();
app.loadMarkers();
