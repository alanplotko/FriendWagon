var map;
var global_markers = [];
var infowindow = new google.maps.InfoWindow({});
var count = 0;
var markers = [];
geocoder = new google.maps.Geocoder();
var chicago = new google.maps.LatLng(41.850033, -87.6500523);
var dc = new google.maps.LatLng(38.995817, -77.04106);
var image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
var myOptions = {
  zoom: 17,
  center: chicago,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions),
     marker = new google.maps.Marker({
         position: chicago,
         map: map,
         icon: image
     });

var directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

var request = {
  origin: chicago,
  destination: dc,
  travelMode: google.maps.TravelMode.DRIVING
};
directionsService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(result);
  }
});

/*var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(38.995817, -77.04106),
  new google.maps.LatLng(38.790399, -77.040591)
);
map.fitBounds(defaultBounds);*/

var input = document.getElementById('gmaps-input');
var autocomplete;
var infowindow;

if(input != null) {
  autocomplete = new google.maps.places.Autocomplete(input, {
     types: ["geocode"]
  });
  autocomplete.bindTo('bounds', map);
  infowindow = new google.maps.InfoWindow();
  
  google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    codeLatLng(place.name, place.geometry.location, false);
  });

  google.maps.event.addListener(map, 'click', function (event) {
    geocoder.geocode({ 'latLng': event.latLng }, function (results, status) {
      codeLatLng(results[0].formatted_address, event.latLng, true);
    });
  });
}

function codeLatLng(name, latlng, click) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var found = false;
      if (results[1]) {
        for(var i = 0; i < results[1].address_components.length; i++) {
          if(results[1].address_components[i].types[0] === "administrative_area_level_1") {
            if(results[1].address_components[i].short_name === "DC") {
              $('#error').css("display", "block");
              $('#error').html("<strong>Reminder:</strong> Don't forget to enter the time of day!");
              $('#MapLat').val(latlng.lat());
              $('#MapLon').val(latlng.lng());
              $('#MapLat, #MapLon').addClass("valid");
              moveMarker(name, latlng);
              if(click) {
                $('#gmaps-input').val(name);
                $('#gmaps-input').addClass("valid");
              }
              found = true;
              return;
            }
          }
        }
      }
      if(!found) {
        $('#error').css("display", "block");
        $('#error').html("<strong>Error:</strong> " + name + " is out of bounds!");
        $('#MapLat').val("");
        $('#MapLon').val("");
        $('#gmaps-input').val("");
        $('#MapLat, #MapLon, #gmaps-input').removeClass("valid");
      }
    }
    else
    {
      $('#error').html("<strong>Error:</strong> Could not connect to Google Maps API. Please try again in a few minutes.");
    }
  });
}

function moveMarker(placeName, latlng) {
  marker.setIcon(image);
  marker.setPosition(latlng);
  infowindow.setContent(placeName);
  infowindow.open(map, marker);
}