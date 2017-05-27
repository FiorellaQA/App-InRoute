

function initMap() {
  var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: laboratoriaLima
  });

  // var markerLaboratoria = new google.maps.Marker({
  //   position: laboratoriaLima,
  //   map: map
  // });

  var latitud, 
      longitud, 
      miUbicacion;

  function funcionExito(posi){
    latitud = posi.coords.latitude;
    longitud = posi.coords.longitude;

    miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map: map
    });

    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud}); //Asignamos un nuevo centro del mapa
  }

  function funcionError(error){
    alert("Tenemos un problema con encontrar tu ubicación");
  }

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("encuentrame").addEventListener("click",buscar);

  //-------- Añadiendo autocompletado (debe estar dentro de la función initMap)
  var inputPartida = document.getElementById("input-origen");
  var inputDestino = document.getElementById("input-destino");

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
  
  // --------Trazando Ruta------//
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  function calculateAndDisplayRoute(directionsService, directionsDisplay){
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status){
        if(status === 'OK'){
          var tarifa = document.getElementById("tarifa");
          var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
          tarifa.classList.remove("none");

          var costo = distancia*1.75;
          console.log(costo);

          if (costo < 4){
            tarifa.innerHTML="S/. 4";
          }else{
            tarifa.innerHTML="S/. " + parseInt(costo);
            console.log(response.routes[0].legs[0].distance.text);
          }

          directionsDisplay.setDirections(response);
          miUbicacion.setMap(null);

        }else{
          window.alert("No encontramos una ruta.");
        }
    });
  }

  directionsDisplay.setMap(map); 

  function trazarRuta(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  document.getElementById("form1").addEventListener("submit", function(e) {
    e.preventDefault();
    trazarRuta();
  });
}













