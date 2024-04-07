let searchBtn = document.getElementById('searchBtn')
let cityName = document.getElementById('cityName')
let locBtn = document.getElementById('locBtn')
let temp = document.getElementById('temp')
const API_KEY = '706ae467772ace5e81d2cb08c394ca46'

async function fetchDataByCity(city){
    try {
        cityName.value = ''
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        let result = await res.json()
        if(result.message){
            temp.innerHTML = `<h1>${city} ${result.message}</h1>`
        }
        else{
            displayWeather(result)
        }
    } catch (err) {
        console.log(err.message)
    }
}

async function fetchDataByCoordinates(lati, longi){
    try {
        cityName.value = ''
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEY}&units=metric`)
        let result = await res.json()
        if(result.message){
            temp.innerHTML = `<h1>${city} ${result.message}</h1>`
        }
        else{
            displayWeather(result)
        }
    } catch (err) {
        console.log(err.message)
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (cityName.value == '') {
        alert("Please enter a city name")
    } else {
        fetchDataByCity(cityName.value)
    }
})

function displayWeather({name, main, wind, weather}){
    temp.innerHTML = `<div class="weatherInfo">
                <h1>${main.temp}°C</h1>
                <img src='https://openweathermap.org/img/w/${weather[0].icon}.png'>
                <p>${weather[0].description}</p>
                <p id='cName'>${name}</p>
                <div class="tempDetails">
                    <div class="details">
                        <p>Wind</p>
                        <p>${wind.speed}m/s</p>
                    </div>
                    <div class="details">
                        <p>Pressure</p>
                        <p>${main.pressure}mb</p>
                    </div>
                    <div class="details">
                        <p>Humidity</p>
                        <p>${main.humidity}%</p>
                    </div>
                </div>
            </div>`
}

document.getElementById('currLocBtn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lati = position.coords.latitude
        let longi = position.coords.longitude
        fetchDataByCoordinates(lati, longi)
    })
})