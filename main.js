//TODAY

let today = document.getElementById('today');
let todayDate = document.getElementById('today-date');
let cityLocation = document.getElementById('location');
let todayDegree = document.getElementById('today-degree');
let todayIcon = document.getElementById('today-icon');
let desc = document.getElementById('today-description');
let humidty = document.getElementById('humidty');
let windy = document.getElementById('wind');
let compass = document.getElementById('compass');
let search = document.getElementById('search-bar');

//NEXT DAY

let nextDay = document.getElementsByClassName('nextDay');
let nextDayIcon = document.getElementsByClassName('nextDay-icon');
let maxDegree = document.getElementsByClassName('max-degree');
let minDegree = document.getElementsByClassName('min-degree');
let nextDayDesc = document.getElementsByClassName('nextDay-description');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];

let response;
let result;
async function getWeather(city = 'cairo') {
    response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=69290e6136164756b65181040231607&q=${city}&days=3`)
    result = await response.json();
    // console.log(result)
    displayWeatherToday()
    displayWeatherNextDay()
}

getWeather()


function displayWeatherToday() {
    date = new Date();
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = ` ${date.getDate()}  ${month[date.getMonth()]}`;
    cityLocation.innerHTML = result.location.name;
    todayDegree.innerHTML = result.current.temp_c;
    todayIcon.setAttribute('src', `https:${result.current.condition.icon}`)
    desc.innerHTML = result.current.condition.text;
    humidty.innerHTML = result.current.humidity;
    windy.innerHTML = result.current.wind_kph;
    compass.innerHTML = result.current.wind_dir
}

function displayWeatherNextDay() {
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(result.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute('src', `https:${result.forecast.forecastday[i + 1].day.condition.icon}`);
        maxDegree[i].innerHTML = result.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = result.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDesc[i].innerHTML = result.forecast.forecastday[i + 1].day.condition.text;



    }
}
search.addEventListener('keyup', function () {
    let city = search.value;
    getWeather(city)

})