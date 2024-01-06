// Student Name: Dibyanshu Ratna Bajracharya
// Student Id: 2408571

// Api key
const API_KEY = 'b19ed9149425e4f0e16a5ad5dd696fb1';
// Api url
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q='

// Creating async function to fetch data
async function fetchData(city) {
  // Fetching data from api
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
  try {
    // Coverting data into JSON  format
    const data = await response.json();
    console.log(data);

    // Setting location
    const locationElement = document.querySelector(".location");
    locationElement.textContent = data.name;

    //Setting time
    const timeElement = document.querySelector(".date");
    let timestampOffset = data.timezone

    // Converting timezone into date
    const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
    const date = new Date(timestamp * 1000);
    timeElement.textContent = `Date:${date.toLocaleString('en-US', {
       day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}`;

    // Setting temperature
    const tempElement = document.querySelector(".temperature");
    const temp = data.main.temp;
    tempElement.textContent = `${parseFloat(temp).toFixed(0)}°C`;

    // Setting condition
    const conditionElement = document.querySelector(".condition");
    conditionElement.textContent = data.weather[0].main;

    // Setting pressure
    const pressureElement = document.querySelector("#pressure");
    pressureElement.textContent = `${data.main.pressure}hPa`;

    // Setting humidity
    const humidityElement = document.querySelector("#humidity");
    humidityElement.textContent = `${data.main.humidity}%`;

    // Setting wind speed
    const windElement = document.querySelector("#wind_s");
    windElement.textContent = `${data.wind.speed}m/s`;

    // Setting visibility
    const visibilityElement = document.querySelector("#visibility");
    visibilityElement.textContent = `${parseFloat(data.visibility / 1000).toFixed(2)}km`;

    // //Setting icon
    const imageElement = document.querySelector(".image");

    // Icon for Clear 
    if(data.weather[0].main == "Clear"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/sun.png?raw=true";
    } 
    
    // Icon for Rain
    else if (data.weather[0].main == "Rain"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/rain.png?raw=true";
    }
    
    // Icon for Few clouds
    else if (data.weather[0].description == "few clouds"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/cloudy-day.png?raw=true";
    }
    
    // Icon for Scattered clouds
    else if (data.weather[0].description == "scattered clouds"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/cloud.png?raw=true";
    }
    
    // Icon for Broken clouds
    else if (data.weather[0].description == "broken cloud" || "overcast clouds"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/cloudy.png?raw=true";
    }
    
    // Icon for Fog and mist
    else if (data.weather[0].main == "Fog" || "Mist"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/fog.png?raw=true";
    }
    
    // Icon for Snow
    else if (data.weather[0].main == "Snow"){
      imageElement.src = "https://github.com/DibuBaj/weather-app/blob/main/snowflake.png?raw=true";
    }
    

    // Setting error
  } catch (error) {
    alert("City not found");
    fetchData('kumbakonam');
  }
}

// Selecting Search Bar Element
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector(".search-button");
const input = document.querySelector("input");

// Setting button response
searchButton.addEventListener("click", () => {
  fetchData(searchInput.value);
});
// Setting enter Key response
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    fetchData(searchInput.value);
  }
})
// Initial call with a default city
fetchData('kumbakonam');

// Welcome feature  
const headElement = document.querySelector(".heading")
headElement.addEventListener("click", () =>{
  alert("Welcome To Weather Forecast");
});