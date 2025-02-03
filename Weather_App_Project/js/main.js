// Weather APP
const weatherForm = document.querySelector(".weather_form");
const cityInput = document.querySelector(".city_input");

const card = document.querySelector(".card");

const apiKey = "f1266b74accdb00510f040d46db20c96";

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);

            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    card.textContent = "";
    card.style.display = "inline-block";

    // Destructuring Assignment: Trích xuất dữ liệu từ 1 đối tượng phức tạp
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
    } = data;

    // Create Element
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Change TextContent
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(
        1
    )}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add Class For Element
    cityDisplay.classList.add("city_display");
    tempDisplay.classList.add("temp_display");
    humidityDisplay.classList.add("humidity_display");
    descDisplay.classList.add("desc_display");
    weatherEmoji.classList.add("weather_emoji");

    // Append Element
    card.append(
        cityDisplay,
        tempDisplay,
        humidityDisplay,
        descDisplay,
        weatherEmoji
    );
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case weatherId >= 200 && weatherId < 300:
            return "⛈️";
        case weatherId >= 300 && weatherId < 400:
            return "🌧️";
        case weatherId >= 500 && weatherId < 600:
            return "🌧️";
        case weatherId >= 600 && weatherId < 700:
            return "🌨️";
        case weatherId >= 700 && weatherId < 800:
            return "🌫️";
        case weatherId === 800:
            return "☀️";
        case weatherId > 801 && weatherId < 810:
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error_display");

    card.textContent = "";
    card.style.display = "inline-block";
    card.appendChild(errorDisplay);
}
