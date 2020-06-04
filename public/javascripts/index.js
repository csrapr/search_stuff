window.addEventListener("load", function () {
  let currentHour = new Date().getHours();

  $("#search-buttons").append(
    `<a href="/nearme" class="btn btn-info ml-2">Perto de mim</a>`
  );

  if (currentHour > 11 && currentHour <= 14) {
    $("#search-buttons").append(
      `<a href="/search?q=diaria" class="btn btn-light ml-2">Diária</a>`,
      `<a href="/search?q=restaurante" class="btn btn-light ml-2">Restaurante</a>`
    );
  }
  if (currentHour >= 18 && currentHour < 23) {
    $("#search-buttons").append(
      `<a href="/search?q=restaurante" class="btn btn-light ml-2">Restaurante</a>`,
      `<a href="/search?q=bar" class="btn btn-light ml-2">Bar</a>`
    );
  }
  if (currentHour >= 23) {
    $("#search-buttons").append(
      `<a href="/search?q=bar" class="btn btn-light ml-2">Bar</a>`
    );
  }
});
