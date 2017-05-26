// navigator.geolocation.getCurrentPosition(initMap);
// function initMap(posi) {
//   var uluru = {lat: posi.coords.latitude, lng: posi.coords.longitude};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 18,
//     center: uluru
//   });
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });
// }

function initMap() {
  var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: laboratoriaLima
  });
  var markerLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map
  });

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  var latitud, longitud;

  var funcionExito = function (position){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;
  };

  var miUbicacion = new google.maps.Marker({
    position: {lat:latitud, lng:longitud},
    map: map
  });

  map.setZoom(18);
  map.setCenter({lat:latitud, lng:longitud});

  var funcionError = function (error){
    alert("Tenemos un problema con encontrar tu ubicación");
  };
}
document.getElementById("encuentrame").addEventListener("click",buscar);






// var inputOrigen = document.getElementById("origen");
// var inputDestino = document.getElementById("destino");

// new google.maps.places.Autocomplete(inputOrigen);
// new google.maps.places.Autocomplete(inputDestino);
// var directionsService = new google.maps.DirectionsService;
// var directionsDisplay = new google.maps.DirectionsRender;