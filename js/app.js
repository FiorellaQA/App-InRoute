navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
  //var position = {lat: -12.1191427, lng: -77.0349046};
  console.log(position);
  var uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: uluru //laboratoriaLima
  });
  var marker = new google.maps.Marker({
    position: uluru, //laboratoriaLima,
    map: map
  });
}