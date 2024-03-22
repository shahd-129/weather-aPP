let todayName = document.getElementById("daays")
let todayDate = document.getElementById("date")
let todayMonth = document.getElementById("date-month")
let todayLocation = document.getElementById("place")
let todayDegre = document.getElementById("deg")
let todayImg = document.getElementById("img")
let todayDescrib = document.getElementById("describ")
let todayHumidity = document.getElementById("humidity")
let todaywind = document.getElementById("wind")
let todayDisWind = document.getElementById("wind-describ")


let nextDay = document.getElementsByClassName("daytow")
let nextImg = document.getElementsByClassName("imgTow")
let nextDegre = document.getElementsByClassName("tempTow")
let nextMinDeg = document.getElementsByClassName("degreeTow")
let nextDecsrib = document.getElementsByClassName("customTow")


let searchInput =document.getElementById("search")
let submit = document.getElementById("submit")


async function getWeatherData(cityName) {
	let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfdfd9081ab544d5b4f205839241701&q=${cityName}`)
	let weatherData = await data.json()
	// console.log(weatherData.forecast.forecastday[0].date);
	return weatherData
}

function displayData(data) {
	let dateToday = new Date ()
	todayName.innerHTML = dateToday.toLocaleDateString("en-Us" ,{weekday:"long"})
	todayDate.innerHTML = dateToday.getDate() 
	todayMonth.innerHTML =  dateToday.toLocaleDateString("en-Us" ,{month:"long"})
	todayLocation.innerHTML = data.location.name
	todayDegre.innerHTML = data.current.temp_c + "<sup>o</sup>C"
	todayDescrib.innerHTML = data.current.condition.text
	todayImg.setAttribute("scr" , data.current.condition.icon) 
	todayDisWind.innerHTML = data.current.wind_dir
	todayHumidity.innerHTML = data.current.humidity + "%"
	todaywind.innerHTML = data.current.wind_kph + "km/h"
}

function displayNextData(data) {
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < forecastData.length; i++) {
		let nextDate = new Date (forecastData[0].date)
		nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" ,{weekday:"long"})
       nextDegre[i].innerHTML = forecastData[i].day.maxtemp_c
	   nextMinDeg[i].innerHTML = forecastData[i].day.mintemp_c
       nextImg[i].setAttribute("src" , forecastData[i].day.condition.icon )
	   nextDecsrib[i].innerHTML = forecastData[i].day.condition.text
    }
}

async function startApp(city="cairo") {
	let weatherData = await getWeatherData(city)
	if(!weatherData.error){
	  displayData(weatherData)
	  displayNextData(weatherData)
	}
}

startApp()

searchInput.addEventListener("input", function () {
	startApp(searchInput.value)
//    console.log(searchInput.value);
  })