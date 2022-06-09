let now = new Date();
let today = document.querySelector(".todayIs");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let mounths = [
  "January",
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
  "December"
];
let mounth = mounths[now.getMonth()];
today.innerHTML = `${day} ${date}, ${mounth} ${hours}:${minutes}`;

// show searched city
function searchedCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#seached-city");
  let formInput = document.querySelector("#city-input");
  let displayCity = formInput.value;
  cityInput.innerHTML = `${displayCity}`;
  showCity(displayCity);
}
// temp in searched city

function showCity(city) {
  let apiKey = "28380c9029ac812a2a683ccc768f6493";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showParam);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchedCity);

function showParam(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#degrees-temp");
  tempElement.innerHTML = `${temp}°C`;
  let displayCity = document.querySelector("#seached-city");
  displayCity.innerHTML = response.data.name;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${response.data.wind.speed} m/s`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity} %`;
  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `${response.data.main.pressure} hPa`;
  let weather = document.querySelector(".weather");
  weather.innerHTML = response.data.weather[0].deskription;
}

// current city
function geotemp(position) {
  let apiKey = "28380c9029ac812a2a683ccc768f6493";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showParam);
}

function gps() {
  navigator.geolocation.getCurrentPosition(geotemp);
}

let currentCityTemp = document.querySelector("#current-city");
currentCityTemp.addEventListener("click", gps);
