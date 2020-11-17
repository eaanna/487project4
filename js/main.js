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
      { start: 1900, end: 2020, title: 'MLB Team Franchises from 1903 to 2020' }
    ],
    // chose not to dynamically load this info as I didn't have time and this information wasn't too difficult to write
    events: [
      {
        start: 1903,
        end: 2020,
        title: 'Chicago Cubs',
        description: 'Founded in the 1870s as the Chicago White Stockings, the team quickly changed to the Chicago Cubs at the beginning of the 20th century.',
      },
      { start: 1903, end: 2020, title: 'Atlanta Braves', description: 'Originally the Boston Red Stockings, the Braves had several name changes until the team was eventually moved to Atlanta in the 1960s where it has remained as the Atlanta Braves.'},
      { start: 1903, end:2020, title: 'San Fransisco Giants', description: 'From the 1870s to the 1950s, the Giants were located in New York but have remained in San Fransisco since.'},
      { start: 1903, end:2020, title: 'Pittsburgh Pirates', description: 'The Pirates have remained a steady team in professional baseball since the 1880s.'},
      { start: 1903, end:2020, title: 'Cincinnati Reds', description: 'The Reds have been around since the 1890s.'},
      { start: 1903, end:2020, title: 'Los Angeles Dodgers', description: 'Originally located in Brooklyn, the Dodgers had several name changes before settling on the name in the 1930s, and kept the name after the team moved to Los Angeles.'},
      { start: 1903, end:2020, title: 'St. Louis Cardinals', description: 'The Cardinals have existed since the 1880s.'},
      { start: 1903, end:2020, title: 'New York Yankees', description: 'After a brief stint as the Baltimore Orioles and the New York Highlanders, the team changed the name to the Yankees as it has remained since the 1910s.'},
      { start: 1903, end:2020, title: 'Boston Red Sox', description: 'Founded during the creation of MLB, the Red Sox were the Boston Americans for roughly a decade before settling as the Red Sox.'},
      { start: 1903, end:2020, title: 'Chicago White Sox', description: 'Founded around 1903, the Chicago White Sox has had no name or city changes.'},
      { start: 1903, end:2020, title: 'Cleveland Indians', description: 'Founded in 1903, the Indians were the Blues and then the Naps until the 1910s.'},
      { start: 1903, end:2020, title: 'Detroit Tigers', description: 'Founded in 1903, the Tigers have never changed their name.'},
      { start: 1903, end:2020, title: 'Baltimore Orioles', description: 'Founded in 1903, the Orioles were briefly the Milwaukee Brewers and the the St. Louis Browns before the team moved to Baltimore and became the Orioles in the 1950s.'},
      { start: 1903, end:2020, title: 'Oakland Athletics', description: 'Starting as the Philadelphia Athletics in 1903, the team moved to Kansas City in the 1950s and then to Oakland in the 1960s where it is today.'},
      { start: 1903, end:2020, title: 'Minnesota Twins', description: 'Originally the Washington Senators, the Minnesota Twins was established in the early 1960s.'},
      { start: 1961, end:2020, title: 'Texas Rangers', description: 'After the Minnesota Twins was established, what is now the Texas Rangers was the Washington Senators until the early 1970s.'},
      { start: 1961, end:2020, title: 'Los Angeles Angels', description: 'After a few name changes due to the Angels technically being located in Anaheim, the team currently associates with the Los Angeles area.'},
      { start: 1962, end:2020, title: 'New York Mets', description: 'The Mets have represented Queens and the greater New York Area since 1962.'},
      { start: 1962, end:2020, title: 'Houston Astros', description: 'While the Astros have kept their name for most of their existence, they moved from the National League to the American League in the 2010s.'},
      { start: 1969, end:2020, title: 'Kansas City Royals', description: 'The Royals were founded in 1969.'},
      { start: 1969, end:2020, title: 'Milwaukee Brewers', description: 'The Brewers moved from the American League to the National League in the 1990s.'},
      { start: 1969, end:2020, title: 'San Diego Padres', description: 'The Padres were founded in 1969.'},
      { start: 1969, end:2020, title: 'Washington Nationals', description: 'Originally, the Nationals were the Montreal Expos, the first Canadian-located team, until the 2000s where the team moved to Washington DC and became the Nationals.'},
      { start: 1977, end:2020, title: 'Seattle Mariners', description: 'The Mariners were founded in 1977.'},
      { start: 1977, end:2020, title: 'Toronto Blue Jays', description: 'After the departure of the Montreal Expos, the Blue Jays are now the only Canadian-based team in the MLB and the second Canadian-based team of all time.'},
      { start: 1991, end:2020, title: 'Colorado Rockies', description: 'The Rockies were founded in 1991.'},
      { start: 1991, end:2020, title: 'Miami Marlins', description: 'Originally the Florida Marlins, the Miami Marlins were founded in 1991.'},
      { start: 1998, end:2020, title: 'Arizona Diamondbacks', description: 'The Diamondbacks were formed in 1998.'},
      { start: 1998, end:2020, title: 'Tampa Bay Rays', description: 'Originally the Tampa Bay Devil Rays, the team dropped the "devil" in the late 2000s.'},
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

// timeline information courtesy of https://upload.wikimedia.org/wikipedia/en/timeline/8e629716353fb0092e6a31f0a000574b.png