// Select the HTML elements that JavaScript will control
const citySelect = document.getElementById("citySelect");
const weatherBtn = document.getElementById("weatherBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const weatherStatus = document.getElementById("weatherStatus");

// Run the getWeather function when the button is clicked
weatherBtn.addEventListener("click", getWeather);

async function getWeather() {
    // The selected value contains latitude, longitude, and city name
    const selectedValue = citySelect.value;
    const cityData = selectedValue.split(",");

    const latitude = cityData[0];
    const longitude = cityData[1];
    const city = cityData[2];

    // Open-Meteo API URL. This gives current temperature, wind speed, and weather code.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;

    try {
        // Show loading text while waiting for the API response
        weatherBtn.textContent = "Loading...";
        weatherBtn.disabled = true;

        // Send request to the API
        const response = await fetch(url);

        // Convert the response into JavaScript data
        const data = await response.json();

        // Display the API data on the webpage
        cityName.textContent = city;
        temperature.textContent = `Temperature: ${data.current.temperature_2m} °C`;
        windSpeed.textContent = `Wind Speed: ${data.current.wind_speed_10m} km/h`;
        weatherStatus.textContent = `Status: ${getWeatherDescription(data.current.weather_code)}`;
    } catch (error) {
        // This part runs if the API request fails
        cityName.textContent = "Error";
        temperature.textContent = "Could not load weather data.";
        windSpeed.textContent = "";
        weatherStatus.textContent = "";
    } finally {
        // Change the button back to normal after the request finishes
        weatherBtn.textContent = "Check Weather";
        weatherBtn.disabled = false;
    }
}

// Convert weather code into simple readable text
function getWeatherDescription(code) {
    if (code === 0) {
        return "Clear sky";
    } else if (code === 1 || code === 2 || code === 3) {
        return "Partly cloudy";
    } else if (code === 45 || code === 48) {
        return "Foggy";
    } else if (code === 51 || code === 53 || code === 55) {
        return "Drizzle";
    } else if (code === 61 || code === 63 || code === 65) {
        return "Rainy";
    } else if (code === 95) {
        return "Thunderstorm";
    } else {
        return "Weather condition unavailable";
    }
}
