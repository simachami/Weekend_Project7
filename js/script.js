


async function getWeatherData(cityName, zipCode) {
    const weatherApi = 'https://api.openweathermap.org/data/2.5/weather'
    const response = await fetch(`${weatherApi}?q=${cityName}&appid=${apiKey}&units=metric`);
    if (response.ok){
    const data = await response.json();
    console.log(data)
    return data;
}
    window.alert('Error fetching data')
}

function displayWeatherData(data) {
    const weatherCard = document.querySelector('.weatherCard');
    const cityNameElement = weatherCard.querySelector('h2');
    const minTemperatureElement = weatherCard.querySelector('.min-temperature');
    const maxTemperatureElement = weatherCard.querySelector('.max-temperature');
    const forecastElement = weatherCard.querySelector('.forecast');
    const humidityElement = weatherCard.querySelector('.humidity');

    cityNameElement.textContent = data.name;
    const celMinTemp = data.main.temp_min 
    const celMaxTemp = data.main.temp_max
    const fahrenheitMinTemp = (celMinTemp * 9/5) + 32
    const fahrenheitMaxTemp = (celMaxTemp * 9/5) + 32
    minTemperatureElement.textContent = `Low Temperature: ${fahrenheitMinTemp.toFixed(1)}°F`;
    maxTemperatureElement.textContent = `High Temperature: ${fahrenheitMaxTemp.toFixed(1)}°F`;
    forecastElement.textContent = `Forecast: ${data.weather[0].description}`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    changeBackground(data.weather[0].main);
}

function changeBackground(weatherCondition) {
    const body = document.body;

    if (weatherCondition.includes('Rain') || weatherCondition.includes('Drizzle')) {
        body.style.backgroundImage = 'url("./static/css/images/rain.jpg")';
    } else if (weatherCondition.includes('Cloud') || weatherCondition.includes('Mist')) {
        body.style.backgroundImage = 'url("./static/css/images/cloudy.jpg")';
    } else if (weatherCondition.includes('Clear')) {
        body.style.backgroundImage = 'url("./static/css/images/sunny.jpg")';
    } else {
        body.style.backgroundImage = 'url("./static/images/default.jpg")';
    }
}

async function weatherApp() {
    const searchButton = document.getElementById('search-btn')
    const cityInput = document.getElementById('cityName')

    searchButton.addEventListener('click', async() => {
        const cityName = cityInput.value 
        if (!cityName) return
        const weatherData = await getWeatherData(cityName)
        displayWeatherData(weatherData)
    })
}
weatherApp();