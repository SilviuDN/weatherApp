const SEARCH_BUTTON = document.querySelector('button');
const SEARCHED_CITY = document.querySelector('#city');

const LOADING_TEXT = document.querySelector('#load');
const WEATHER_BOX = document.querySelector('#weather');

const WEATHER_CITY = document.querySelector('#weatherCity');
const WEATHER_DESCRIPTION = document.querySelector('#weatherDescription');
const WEATHER_TEMPERATURE = document.querySelector('#weatherTemperature');

class Http{
    static fetchData(url){
        return new Promise((res, rej) => {
            const HTTP = new XMLHttpRequest();
            HTTP.open('GET', url);
            HTTP.onreadystatechange = function(){
                if( HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200){
                    const RESPONSE_DATA = JSON.parse(HTTP.responseText);
                    res(RESPONSE_DATA);
                }else if(HTTP.readyState == XMLHttpRequest.DONE){
                    rej('Something went wrong!')
                }
            }
            HTTP.send();
        })
    }
}


class WeatherData{
    constructor(cityName, description, temperature){
        this.cityName = cityName;
        this.description = description;
        this.temperature = temperature;
    }
}

const APP_ID = process.env.APP_ID;
console.log(APP_ID);

SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather(){
    const CITY_NAME = SEARCHED_CITY.value.trim();
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
    WEATHER_CITY.textContent = weatherData.cityName;
    WEATHER_DESCRIPTION.textContent = weatherData.description;
    WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    WEATHER_BOX.style.display = 'block';
}