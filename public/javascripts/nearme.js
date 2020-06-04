window.addEventListener("load", function () {
  $("#get-location-btn").click(getUserLocation());
});

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let cards = $(".card-header");
  let idxToRemove = [];
  let idsToRemove = [];
  for (let i = 0; i < cards.length; i++) {
    let coords = cards[i].attributes[1].nodeValue
      //remove ] and [
      .replace("[", "")
      .replace("]", "")
      //split string by ","
      .split(",")
      //for each element in the generated array, convert to number
      .map((coord) => coord - 0);
    let distance = getDistanceFromLatLonInKm(
      latitude,
      longitude,
      coords[0],
      coords[1]
    );

    if (distance > 2) {
      idxToRemove.push(i);
      idsToRemove.push(cards[i].outerText.split(" ").join("_"));
    } else {
      cards[i].innerHTML = cards[i].innerHTML + ` - ${distance.toFixed(2)} Km`;
    }
  }
  idxToRemove.forEach((index) => cards[index].remove());
  idsToRemove.forEach((id) => {
    $(`#${id}`).innerHTML = "";
    $(`#${id}`).remove();
  });
}

function error() {}

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
