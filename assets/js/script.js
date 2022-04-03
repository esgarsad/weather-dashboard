var weatherEl = document.querySelector("#weather-container");
var foreEl0 = document.querySelector("#day-0");
var foreEl1= document.querySelector("#day-1");
var foreEl2= document.querySelector("#day-2");
var foreEl3= document.querySelector("#day-3");
var foreEl4= document.querySelector("#day-4");
var foreCards = [foreEl0,foreEl1,foreEl2,foreEl3,foreEl4]
var cityEl= document.querySelector("#city-shown");
var cityFormEl = document.querySelector("#city-form");
var cityTargetEl= document.querySelector(".city-target");
var cardsEl= document.querySelector(".card1");
var cardsEl2= document.querySelector(".card2");
var cardsEl3= document.querySelector(".card3");
var cardsEl4= document.querySelector(".card4");
var cardsEl5= document.querySelector(".card5");
var recentEl= document.querySelector(".recents");

//looks for current weather with coordinates from previous function
var weatherLook = function(cityLat,cityLon,cityName,cityState) {
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=metric&exclude=minutely,hourly&appid=f1718b72fe98852fe1dc33c4315c5ec9";
// make a fetch to url
fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function(data) {
  var currTemp = data.current.temp;
  var currWind = data.current.wind_speed;
  var currHum = data.current.humidity;
  var currUvi = data.current.uvi;
  var currWeather = data.current.weather[0].main;
  //create h3 elements 
  var tempNow = document.createElement("h2");
  var windNow = document.createElement("h2");
  var humNow = document.createElement("h2");
  var uvNow = document.createElement("h2");
  var cityNow = document.createElement("span");
//assign text value to variables
  tempNow.textContent =  "Temp: " + currTemp +"C -" +currWeather;
  windNow.textContent = "Wind speed: " + currWind + "km/h";
  humNow.textContent = "Humidity: " + currHum;
  uvNow.textContent = "UV index: " + currUvi;
  cityNow.textContent =  cityName + ", " + cityState;

  weatherEl.append(tempNow,windNow,humNow,uvNow)
  cityEl.append(cityNow)
//console.log(data.daily[0].temp.day)
console.log(currWeather)
displayForecast(data);
});
//creates forecast with wame data -3-
var displayForecast = function(data) {
for (var i = 0; i < 5; i++ ) {
  var foreTemp = data.daily[i].temp.day;
  var foreWind = data.daily[i].wind_speed;
  var foreHum = data.daily[i].humidity;
  var foreWeather = data.daily[i].weather[0].main

  //console.log(data.daily[i].temp.day)
  var tempFore = document.createElement("h3")
  var windFore = document.createElement("h3")
  var humFore = document.createElement("h3")
  var weatherFore = document.createElement("h3")
  
  tempFore.textContent ="Temp: " + foreTemp + "C";
  weatherFore.textContent =foreWeather;
  windFore.textContent = "Wind: " + foreWind + "km/h";
  humFore.textContent = "Humidity: " + foreHum;

foreCards[i].append(tempFore,weatherFore,windFore,humFore);
}}}

// function to get geo location -2-
var lookcoordinates = function(cityToLook) {
var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityToLook + "&appid=f1718b72fe98852fe1dc33c4315c5ec9"

fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function(location) {
  var cityName = location[0].name;
  var cityState = location[0].state;
  var cityLat = location[0].lat;
  var cityLon = location[0].lon;

  weatherLook(cityLat,cityLon,cityName,cityState)
})
}
// gets city value fron text input  -1-
var formSubmit = function(event) {
  event.preventDefault();

  var cityToLook = cityTargetEl.value.trim();
  if (cityToLook){
//cleans screen form prevous old content
  cityEl.textContent = "";
  weatherEl.textContent = "";
  cardsEl.textContent = ""; 
  cardsEl2.textContent = ""; 
  cardsEl3.textContent = ""; 
  cardsEl4.textContent = ""; 
  cardsEl5.textContent = ""; 
  
  lookcoordinates(cityToLook);
//creates button with recent search
  var recSearch = document.createElement("button")
  recSearch.classList.add('btn');
  recSearch.textContent = cityToLook;
  recentEl.append(recSearch);
  cityTargetEl.value= "";
  }
}
//gets city input from recent history
$(".recents").on("click", "button", function() {
  // get current text of button element
  var cityToSearch = $(this).text()
 
  lookcoordinates(cityToSearch);
  cityEl.textContent = "";
  weatherEl.textContent = "";
  cardsEl.textContent = ""; 
  cardsEl2.textContent = ""; 
  cardsEl3.textContent = ""; 
  cardsEl4.textContent = ""; 
  cardsEl5.textContent = ""; 
}
)

cityFormEl.addEventListener("submit", formSubmit);

