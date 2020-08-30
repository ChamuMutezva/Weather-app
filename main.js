const form = document.querySelector("form")
let cityData = "Bulawayo"
async function getWeather(cityInfo) {
    const futureDate = new Date();
    console.log(futureDate.toDateString())    
    let lat
    let lon

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInfo}&units=metric&include=daily,hourly&APPID=fe6ae1105f55c208a0b19ec80c0a7544`);
    const weatherData = await res.json();
    console.log(weatherData)

    //get all countries - to use with the above data 
    //which only contains the country code
    // combine with code below to get the full country
    const countryList = await fetch(`https://restcountries.eu/rest/v2/all`);
    const countries = await countryList.json();
   // console.log(countries);
    const selectCountry = countries.find(cty => cty.alpha2Code == weatherData.sys.country)
       
    
    console.log(selectCountry.name)

    const city = document.querySelector(".currentData h2")
    const weatherDesc = document.querySelector(".currentData h3")
    const currentTemp = document.querySelector(".current")
    const img = document.querySelector(".currentData img")
    const dateTaken = document.querySelector(".currentData h5")

    dateTaken.innerHTML = futureDate.toDateString();
    city.innerHTML = weatherData.name + ", " + selectCountry.name
    currentTemp.innerHTML = `${weatherData.main.temp}&deg C`
    weatherDesc.innerHTML = weatherData.weather[0].description
    img.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
   
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
    weekDiv.innerHTML = "";
   
    //console.log(weekForecast)
    weekForecast.daily.map(periodTime => {
        console.log(unixConverter(periodTime))
       // unixConverter(periodTime)
        const nextDate = unixConverter(periodTime)
       
       
        const  imgSrc = `http://openweathermap.org/img/wn/${periodTime.weather[0].icon}@2x.png`
        console.log(periodTime)
        let template = `
        <div class="forecast">                         
                <h3>${nextDate}</h3
                <h3>${periodTime.temp.day}&deg C</h3>                
                <div class="rainCondition">
                    <img src=${imgSrc} />                   
                </div>
                
                
                
            
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

       // console.log(day, month, dayNum, year)
        return `${day} ${month} ${dayNum} ${year}`
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


