import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from 'weather-data.js'

const APP_ID = 'API_KEY_GOES_HERE';

ELEMENTS.SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather(){
    const CITY_NAME = ELEMENTS.SEARCHED_CITY.value.trim();
    if(CITY_NAME.length == 0){
        alert('Please enter a city name!');
    }
    const URL ='http://api.openweathermap.org/data/2.5/weather?q=' + CITY_NAME + '&units=metric&appid=' + APP_ID;

    Http.fetchData(URL)
        .then( resData => {
            const WEATHER_DATA = new WeatherData(CITY_NAME, resData.weather[0].description.toUpperCase(), resData.main.temp);
            updateWeather(WEATHER_DATA);
        }) 
        .catch( err => alert(err));
}

function updateWeather(weatherData){
    ELEMENTS.WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    ELEMENTS.WEATHER_BOX.style.display = 'block';
}