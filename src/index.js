let timeInformation = new Date();

// Get the date
let date = timeInformation.getDate();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekDays[timeInformation.getDay()];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[timeInformation.getMonth()];

//  Get the time
let timeString = timeInformation.toTimeString();
let onlyHour = timeString.slice(0, 5);

// Change date information
let dateInfo = document.querySelector("#date-information");
let timeInfo = document.querySelector("#time-information");

dateInfo.innerHTML = day + " " + date + "/" + month;
timeInfo.innerHTML = onlyHour;

// Search engine
let apiKey = "2feb2c01d0877b35434ff4165f9feb51";
let units = "metric";
function handleSubmitBtn(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityName = cityInput.value;
  getCity(cityName);
}

function getCity(cityName) {
  let apiUrlByName = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlByName).then(retrieveData);
  console.log(axios.get(apiUrlByName));
}

function retrieveData(response) {
  // For the temperature
  let rawTemperature = response.data.main.temp;
  let temperature = Math.round(rawTemperature);
  let stringTemperatureC = document.querySelector("#number-temperature");
  stringTemperatureC.innerHTML = temperature;

  // For the city name
  let city = response.data.name;
  let cityHeader = document.querySelector("#header-city");
  cityHeader.innerHTML = city;

  // For the description
  let description = response.data.weather[0].main;
  let descriptionHeader = document.querySelector("#weather-description");
  descriptionHeader.innerHTML = description;

  // For the conditions
  let humidity = response.data.main.humidity;
  let humidityDescription = document.querySelector("#humidity-perc");
  humidityDescription.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windDescription = document.querySelector("#wind-speed");
  windDescription.innerHTML = `Wind: ${wind} km/h`;
}

let searchEngine = document.querySelector("#submit-button");
searchEngine.addEventListener("click", handleSubmitBtn);

// Search current location

let searchCurrent = document.querySelector("#current-button");
searchCurrent.addEventListener("click", retrieveLocalData);

function retrieveLocalData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCoords);
}

function retrieveCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlByCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2736b0689b3a6c2f1824c8cb13a30bbd&units=metric`;
  axios.get(apiUrlByCoords).then(retrieveData);
}

getCity("Copenhagen");

// "Convert" temperature
// For Celsius
// function celsiusTemperature() {
//   let stringTemperatureC = document.querySelector("#number-temperature");
//   stringTemperatureC.innerHTML = "15";
// }
// let celsius = document.querySelector("#celsius-temp");
// celsius.addEventListener("click", celsiusTemperature);

// // For Fahrenheit
// function fahrenheitTemperature() {
//   let stringTemperatureF = document.querySelector("#number-temperature");
//   stringTemperatureF.innerHTML = "59";
// }
// let fahrenheit = document.querySelector("#fahrenheit-temp");
// fahrenheit.addEventListener("click", fahrenheitTemperature);
