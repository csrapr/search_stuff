var restaurantCoords = restaurantLocation.split(",").map((nstr) => nstr - 0);
var restaurantLatitude = restaurantCoords[0];
var restaurantLongitude = restaurantCoords[1];

console.log(restaurantLatitude + " " + restaurantLongitude);

window.addEventListener("load", function () {
  this.document.getElementById("request-location-button").click();
});

function getUserLocation() {
  document.getElementById("request-location-button").remove();
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let distanceKm = getDistanceFromLatLonInKm(
    latitude,
    longitude,
    restaurantLatitude,
    restaurantLongitude
  );

  let paragraph = document.createElement("p");

  let boldElement = document.createElement("strong");
  let textToBold = document.createTextNode(distanceKm.toFixed(2) + " Km");
  boldElement.appendChild(textToBold);

  paragraph.appendChild(boldElement);

  document.getElementById("location-card-body").appendChild(paragraph);
}

function error() {
  let message = document.createElement("p");
  message.textContent = "Permita a localização para medir a distância";
  document.getElementById("location-card-body").appendChild(message);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
