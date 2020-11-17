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
  teamLong: [],
  teamStadium: []
};
let myMap;


function loadJSON() {
  $.getJSON("mlbteams.json", function (mlb) {
    console.log(mlb);
    parseData(mlb);
  });

  //$('.modal-body').html("hello world");
  // $('#moreInfo').modal('show');
}

function parseData(mlb) {
  mlb.forEach(function (f) {
    teams.teamName.push(f.name);
    teams.teamCity.push(f.city);
    teams.teamRegion.push(f.region);
    teams.teamLeague.push(f.league);
    teams.teamLat.push(f.latitude);
    teams.teamLong.push(f.longitude);
    teams.teamStadium.push(f.stadium);
  });

  console.log(teams);
  initMap();
}

let items = Object.keys(teams);
console.log(items);
items.map(key => {
  let value = teams[key];
  console.log(key, value)
});



function initMap() {
  //make a new map
  console.log(items.length);
  myMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8282, lng: -97 },
    zoom: 4,
  });
  console.log(items);
  console.log(teams.teamLat);

  // for each item in the object, make a marker and fill with content
  for (var i = 0; i < teams.teamLat.length; i++) {
    latLng = new google.maps.LatLng(teams.teamLat[i], teams.teamLong[i]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: myMap,
      icon: 'img/marker2.png',
      title: teams.teamName[i]
    });

    // making natl and amer. leagues have different markers
    if (teams.teamLeague[i] === "National League") {
      marker.icon = 'img/marker2.png';
    } else {
      marker.icon = 'img/marker3.png';
    }

    // Attaching a click event to the current marker
    (function (marker, teams) {

      var modalContent = teams.teamName[i];
      modalContent = modalContent.replace(/\s/g, "");
      console.log(modalContent);


      var html = '';
      html += '<div id="popup">';
      html += '<p>Team Name: ' + teams.teamName[i] + '</p>';
      html += '<p>City: ' + teams.teamCity[i] + '</p>';
      html += '<p>League: ' + teams.teamLeague[i] + '</p>';
      html += '<p>League Region: ' + teams.teamRegion[i] + '</p>';
      // html += '<img src="' + teams.teamStadium[i] + '" alt="baseball stadium">';
      html += '<a id="moreInfo" data-toggle="modal" href="#' + modalContent + '">More Information</a>';
      html += '</div>';


      // the popup
      var infoWindow = new google.maps.InfoWindow({
        content: html
      });
      google.maps.event.addListener(marker, "click", function (e) {
        infoWindow.open(map, marker);
        console.log(marker);

      });

      //on click open modal
      $(function () {
        var dialog = $(modalContent).dialog();
        //$('a.image_links').on('click', function(e){
        $(document).on('click', 'a#moreInfo', function () {
          //e.preventDefault();
          //alert($(this).data('image'));
          // var image_src = $(this).data('image');
          // $(modalContent).attr("src", image_src);
          $(dialog).dialog('open');
        });
  
        $(dialog).dialog('close');
  
      })

    })(marker, teams);  //END of click event/CLOSURE

    // $('#' + modalContent).append(html);

    /* for (var i = 0; i < teams.teamLat.length; i++) {
       var modalContent = teams.teamName[i];
       modalContent = modalContent.replace(/\s/g, "");
       console.log(modalContent);
   
       $('#' + modalContent).modal('show');
     } */

  } //END of LOOP

} //END of initMap


//$('.modal-body').html(test);




//dataTable
$('#table1').DataTable({
  "ajax": 'mlbteams2.json',
  "columns": [
    { "data": "name" },
    { "data": "city" },
    { "data": "region" },
    { "data": "league" },
    { "data": "latitude" },
    { "data": "longitude" }
  ]
});

// loop to open modal for datatable 



// timeline
$('#timeline').timespace({
  data: {
    headings: [
      { start: 1900, end: 2020, title: 'Timeline of MLB Team Franchises' }
    ],
    events: [
      {
        start: 1980,
        title: 'Breakfast',
        description: 'Eat a healthy breakfast.',
      },
      { start: 1950, end: 2000, title: 'Walk', description: 'Go for a walk.' },
      { start: 1903, title: 'Lunch', description: 'Eat a healthy lunch.' }
    ]
  },

  // max width in pixels
  maxWidth: 1000,

  // max height in pixels
  maxHeight: 280,

  // the amount of pixels to move the Timespace on navigation
  // 0 to disable
  navigateAmount: 200,

  // The multiplier to use with navigateAmount when dragging the time table horizontally
  dragXMultiplier: 1,

  // The multiplier to use with navigateAmount when dragging the time table vertically
  dragYMultiplier: 1,

  // selected event
  // 0 for first event, -1 to disable
  selectedEvent: 0,

  // if the time table should shift when an event is selected
  shiftOnEventSelect: true,

  // If the window should scroll to the event display box on event selection (only applies if the time table height is greater than the window height)
  scrollToDisplayBox: true,

  // jQuery object to use for the event display box
  customEventDisplay: null,

  // or '<a href="https://www.jqueryscript.net/time-clock/">date</a>'
  timeType: 'year',

  // receives the lowercase suffix string and returns a formatted string
  timeSuffixFunction: s => ' ' + s[0].toUpperCase() + s[1].toUpperCase(),

  // start/end time
  startTime: 1900,
  endTime: 2020,

  // the amount of time markers to use
  // 0 to calculate from startTime, endTime, and markerIncrement
  markerAmount: 0,

  // the amount of time between each marker
  markerIncrement: 10,

  // width of marker
  markerWidth: 100,

  controlText: {
    navLeft: 'Move Left',
    navRight: 'Move Right',
    drag: 'Drag',
    eventLeft: 'Previous Event',
    eventRight: 'Next Event',
  }

});

//from tutorial "https://www.svennerberg.com/2012/03/adding-multiple-markers-to-google-maps-from-json/"

// timeline plugin https://www.jqueryscript.net/time-clock/Timeline-Slider-jQuery-Timespace.html