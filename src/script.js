let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let months = [
    "Junuary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let text = `${day} ${hours}:${min}, ${month} ${date}`;
  return text;
}

let h2 = document.querySelector("h2");
h2.innerHTML = formatDate();

function showTemperature(response) {
  let temperature = response.data.main.temp.toFixed(0);
  let temperatureC = document.querySelector("#current-temperature");
  temperatureC.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "3e5761385c02293899defe61082c2901";
  let city = `${searchInput.value}`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showCity(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

function showPosition(position) {
  let apiKey = "3e5761385c02293899defe61082c2901";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let city = `lat=${lat}&lon=${lon}`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
  axios.get(`${apiUrl}`).then(showCity);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentT = document.querySelector("#button");
currentT.addEventListener("click", currentPosition);
