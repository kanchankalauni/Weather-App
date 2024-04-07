let searchBtn = document.getElementById('searchBtn')
let cityName = document.getElementById('cityName')
let locBtn = document.getElementById('locBtn')
let temp = document.getElementById('temp')
const API_KEY = '706ae467772ace5e81d2cb08c394ca46'

async function fetchData(city){
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

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (cityName.value == '') {
        alert("Please enter a city name")
    } else {
        fetchData(cityName.value)
    }
})

function displayWeather({name, main, wind}){
    div = `<div class="weatherInfo">
                <h1>${main.temp}°C</h1>
                <p>${name}</p>
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
            temp.innerHTML = div
}