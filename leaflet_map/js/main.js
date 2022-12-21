// This Java-Script file contains the script which is responsible for 
// the functionalities and representations of the webmap.

//---------------------------------
//--- Part 1: Adding a Basemap ----
//---------------------------------

// L.map instantiates the webmap. The variable 'map' must match the DOM ID of the div element in the HTML document.
// Center and zoom define how the map is displayed when called.  

var map = L.map('map', {
	center: [51.513, -0.126], 
	zoom: 19
}).setView([51.513, -0.126], 14);;

map.zoomControl.setPosition('topright');

// Basemaps are instantiated with L.tileLayer. Attributation is important to show where the basemap comes from.
// Minzoom and maxzoom are useful to set the minimum and maximum zoom level for the user.  

// Open Street map
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.tileLayer(osmUrl, {
	minZoom: 15, 
	maxZoom: 19, 
	attribution: osmAttrib
}).addTo(map);		

// Esri_WorldStreetMap

var Esri_Street = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	minZoom: 15, 
	maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

// Esri_WorldImagery
var Esri_World = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	minZoom: 15, 
	maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//---------------------------------------------
//--- Part 2: Adding GeoJson/icon features ----
//---------------------------------------------

var BusIcon = L.icon ({
	iconUrl: "css/Images/bus_stop_2.png",
	iconSize: [50,50],
	iconAnchor: [12, 41],
	popupAnchor: [13, -35],
});

var stop = L.geoJson(bus, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: BusIcon});
    },
	onEachFeature: onEachBib 
}).addTo(map);

//----------------------------------------------------
//--- Part 3: Adding Pop-up attribute information ----
//----------------------------------------------------


function onEachBib (feature, layer) { 
   layer.bindPopup( 
		'Name: ' + feature.properties.Name + '<br>' + 
		'Stop ID: ' + feature.properties.StopID + '<br>' +
		'Address: ' + feature.properties.Address + ', ' + 
		feature.properties.Postcode + '<br>' + 
		'Municipality: ' + feature.properties.municipality); 
   layer.on({ 
      click: zoomToMarker 
     }) 
};

function zoomToMarker(e) { 
    map.setView(e.latlng, 14)}; //zooms to level 14 and centers the marker	

//----------------------------------------------
//--- Part 4: Layer Control & Map Element   ----
//----------------------------------------------

// 4.1: Layer control
var basemap = {
	'OpenStreetMap': osm,
	'Esri.WorldStreetMap': Esri_Street,
	'Esri.WorldImagery': Esri_World
}
var overlay = {
	'TFL Bus Stops': stop
}

L.control.layers(basemap, overlay).addTo(map);

// 4.2: Map element
L.control.scale().addTo(map);











