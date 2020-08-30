const form = document.querySelector("form")
let cityData = "Bulawayo"
async function getWeather(cityInfo) {
    let lat
    let lon
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInfo}&units=metric&include=daily,hourly&APPID=fe6ae1105f55c208a0b19ec80c0a7544`);
    const weatherData = await res.json();
    console.log(weatherData)
    const city = document.querySelector("h2")
    const weatherDesc = document.querySelector("h3")
    const currentTemp = document.querySelector(".current");
    const img = document.querySelector("img")
    city.innerHTML = weatherData.name
    weatherDesc.innerHTML = weatherData.weather[0].description
    img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    currentTemp.innerHTML = `Current temperature ${weatherData.main.temp}`
    lat = weatherData.coord.lat
    lon = weatherData.coord.lon
    console.log(lat, lon)
    getWeekly(lat, lon)
}
getWeather(cityData)

async function getWeekly(latitude, longitude) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly&appid=fe6ae1105f55c208a0b19ec80c0a7544`)
    const weeklyData = await res.json();
    displayData(weeklyData)
}

const displayData = (weekForecast) => {
    const weekDiv = document.querySelector(".weeklyData")
    const futureDate = new Date();
    console.log(futureDate.toDateString())    
   
    //console.log(weekForecast)
    weekForecast.daily.map(periodTime => {

        unixConverter(periodTime)
       
        const  imgSrc = `http://openweathermap.org/img/wn/${periodTime.weather[0].icon}@2x.png`
        console.log(periodTime)
        let template = `
        <div>
         <h3>${periodTime.weather[0].description}</h3>
         <h3>${periodTime.temp.day}</h3>
         <img src=${imgSrc} />
         </div
         `
        // console.log(dayDated)
        console.log(periodTime)
        weekDiv.innerHTML += template
    })
}

const unixConverter = unixstamp => {
 //unix time is in seconds convert it to milloseconds 
        // by multiplying with 1000

        const unix_timestamp = unixstamp.dt;
        const date = new Date(unix_timestamp * 1000)        
        const dateArr = date.toString().split(" ");
       // console.log(dateArr)

        const day = dateArr[0]
        const month = dateArr[1]
        const dayNum = dateArr[2]
        const year = dateArr[3]

        console.log(day, month, dayNum, year)
        return day, month, dayNum, year
       // console.log(unix_timestamp);
       // console.log(day, year)
       // console.log(date)
        
}

form.addEventListener("submit", (event) => {
    const cityValue = document.getElementById("searchCity");
    event.preventDefault()
    console.log(event)
    console.log(cityValue.value)
    getWeather(cityValue.value)

})


