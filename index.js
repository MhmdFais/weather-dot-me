let searchButton = document.querySelector("#search");
let cityInput = document.querySelector("#city-name");
let dateTimeDiv = document.querySelector(".date-and-time");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  getTheLocationFromUser();
});

function getTheLocationFromUser() {
  let userLocation = cityInput.value;
  console.log(userLocation);
  fetchTheWeather(userLocation);
  clearInput();
}

async function fetchTheWeather(userLocation) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=89754c20c1594d7894434505240706&q=${userLocation}`
  );
  if (response.status === 400) {
    displayError();
  } else {
    const data = await response.json();
    console.log(data);
    displayData(data);
  }
}

function displayError() {
  const errorContainer = document.querySelector(".error-container");
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-div");
  const errorPara = document.createElement("p");
  errorPara.textContent = "Please enter a valid city name";
  errorDiv.appendChild(errorPara);
  errorContainer.appendChild(errorDiv);
  //after 200ms remove the error message
  setTimeout(() => {
    errorDiv.remove();
    clearInput();
  }, 2000);
}

function clearInput() {
  cityInput.value = "";
}

function displayData(data) {
  const userEnteredLocation = data.location.name;
  const userCountry = data.location.country;
  const userEnteredDate = data.location.localtime;
  const conditionText = data.current.condition.text;
  const currentTemp = data.current.temp_c;
  const feelsLike = data.current.feelslike_c;
  const humidity = data.current.humidity;
  const cloudiness = data.current.cloud;
  displayUsersCountryAndLocation(userEnteredLocation, userCountry);
  displayUserEnteredDate(userEnteredDate);
  displayCurrentWeather(conditionText, currentTemp);
  displayFeelsLike(feelsLike);
  displayHumidity(humidity);
  displayCloudiness(cloudiness);
}

function displayUsersCountryAndLocation(userEnteredLocation, userCountry) {
  const cityDiv = document.querySelector(".city");
  const countryDiv = document.querySelector(".country");

  cityDiv.textContent = "";
  countryDiv.textContent = "";

  cityDiv.textContent = `${userEnteredLocation},`;
  countryDiv.textContent = userCountry;
}

function displayUserEnteredDate(userEnteredDate) {
  const dateDiv = document.querySelector(".date");
  const timeDiv = document.querySelector(".time");

  const dateTime = new Date(userEnteredDate);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  dateDiv.textContent = "";
  timeDiv.textContent = "";

  dateDiv.textContent = formattedDate;
  timeDiv.textContent = formattedTime;
}

function displayCurrentWeather(conditionText, currentTemp) {
  const mainDiv = document.querySelector(".wether-stat");
  const currentWeatherDiv = document.querySelector(".current-weather");
  const textDiv = document.querySelector(".current-text-div");
  const numberDiv = document.querySelector(".current-number-div");
  const text = document.querySelector(".current-text");
  const number = document.querySelector(".current-number");

  text.textContent = "";
  number.textContent = "";

  text.textContent = conditionText;
  number.textContent = `${currentTemp} °C`;

  textDiv.appendChild(text);
  numberDiv.appendChild(number);
  currentWeatherDiv.appendChild(textDiv);
  currentWeatherDiv.appendChild(numberDiv);
  mainDiv.appendChild(currentWeatherDiv);
}

function displayFeelsLike(feelsLike) {
  const mainDiv = document.querySelector(".wether-stat");
  const feelsLikeDiv = document.querySelector(".feels-like");
  const textDiv = document.querySelector(".feels-text-div");
  const numberDiv = document.querySelector(".feels-number-div");
  const text = document.querySelector(".feels-text");
  const number = document.querySelector(".feels-number");

  text.textContent = "";
  number.textContent = "";

  text.textContent = "Feels like";
  number.textContent = `${feelsLike} °C`;

  textDiv.appendChild(text);
  numberDiv.appendChild(number);
  feelsLikeDiv.appendChild(textDiv);
  feelsLikeDiv.appendChild(numberDiv);
  mainDiv.appendChild(feelsLikeDiv);
}

function displayHumidity(humidity) {
  const mainDiv = document.querySelector(".wether-stat");
  const humidityDiv = document.querySelector(".humidity");
  const textDiv = document.querySelector(".humidity-text-div");
  const numberDiv = document.querySelector(".humidity-number-div");
  const text = document.querySelector(".humidity-text");
  const number = document.querySelector(".humidity-number");

  text.textContent = "";
  number.textContent = "";

  text.textContent = "Humidity";
  number.textContent = `${humidity}%`;

  textDiv.appendChild(text);
  numberDiv.appendChild(number);
  humidityDiv.appendChild(textDiv);
  humidityDiv.appendChild(numberDiv);
  mainDiv.appendChild(humidityDiv);
}

function displayCloudiness(cloudiness) {
  const mainDiv = document.querySelector(".wether-stat");
  const cloudinessDiv = document.querySelector(".cloudiness");
  const textDiv = document.querySelector(".cloudiness-text-div");
  const numberDiv = document.querySelector(".cloudiness-number-div");
  const text = document.querySelector(".cloudiness-text");
  const number = document.querySelector(".cloudiness-number");

  text.textContent = "";
  number.textContent = "";

  text.textContent = "Cloudiness";
  number.textContent = `${cloudiness}%`;

  textDiv.appendChild(text);
  numberDiv.appendChild(number);

  textDiv.appendChild(text);
  numberDiv.appendChild(number);
  cloudinessDiv.appendChild(textDiv);
  cloudinessDiv.appendChild(numberDiv);
  mainDiv.appendChild(cloudinessDiv);
}
