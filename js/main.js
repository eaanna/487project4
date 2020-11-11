/*$(document).ready(function() {
  console.log("ready");
  loadJSON();
});
*/

var teams = {
 teamName: [],
 teamCity: [],
 teamRegion: [],
 teamLeague: [],
 teamLat: [],
 teamLong: []
};
let myMap;


function loadJSON() {
  $.getJSON("mlbteams.json", function (mlb) {
      console.log(mlb);
      parseData(mlb);
  });
}

function parseData(mlb) {
  mlb.forEach(function(f) {
   teams.teamName.push(f.name);
   teams.teamCity.push(f.city);
   teams.teamRegion.push(f.region);
   teams.teamLeague.push(f.league);
   teams.teamLat.push(f.latitude);
   teams.teamLong.push(f.longitude);
  });

  console.log(teams);
  initMap();
}

let items = Object.keys(teams);
console.log(items);
// ["key1", "key2", "key3"]
items.map(key => {
 let value = teams[key];
 console.log(key, value)
}); 




function initMap() {
  console.log(items.length);
  myMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8282, lng: -97 },
    zoom: 4,
  });
  console.log(items);
  console.log(teams.teamLat);
  for (var i = 0; i < teams.teamLat.length; i++) {
        latLng = new google.maps.LatLng(teams.teamLat[i], teams.teamLong[i]); 
    // Creating a marker and putting it on the map
    var marker = new google.maps.Marker({
      position: latLng,
      map: myMap,
      icon: 'img/marker2.png', 
      title: teams.teamName[i]
    });
   
    // Attaching a click event to the current marker
    ( function (marker, teams) {
      console.log(teams.teamName[i]);
      var html = 'hi';
      var infoWindow = new google.maps.InfoWindow( {
        content: html
      });
    google.maps.event.addListener(marker, "click", function(e) {
   //   infoWindow.setContent(teams.teamName[i]);
      infoWindow.open(map, marker);
      console.log(teams.teamName[i]);
      console.log(marker);
    });
  }) (marker, teams);

  }

 

}


$('#table1').DataTable( {
  "ajax": 'mlbteams2.json',
  "columns": [
      { "data": "name"},
      { "data": "city"},
      {"data": "region"},
      { "data": "league"},
      { "data": "latitude"},
      { "data": "longitude"}
  ]
} );


/*var marker = new google.maps.Marker({
  map: myMap,
  icon: 'img/marker2.png',
  position: {
    lat: 40,
    lng: -99 
    // add teamLat and teamLong here
    // got a "not a num error"
  }
});
*/


//from tutorial "https://www.svennerberg.com/2012/03/adding-multiple-markers-to-google-maps-from-json/"