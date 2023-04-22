
let weather = {
  apiKey: config. MY_API_TOKEN,
  fetchWeather: function (lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.getWeather(data))
  },
  getWeather: function (data) {
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { name:country } = data;
      
    document.querySelector('.temp').innerText  = temp + " °C"
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector('.description').innerText = description;
    document.querySelector('.humidity').innerText = "Humidity: "+ humidity + " %";
    document.querySelector('.icon').src=`http://openweathermap.org/img/wn/${icon}.png`; 
    // document.querySelector(".city").innerText += `  (${country})`;
    setTimeout(()=>{
      document.querySelector('.weather').classList.remove('weather');
      document.querySelector('.loading').style.display="none";
  },500);
},
};

let place = {
  apiKey: config. MY_API_TOKEN,
  fetchPlace: function (city) {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        this.getLocation(data);
      })
  },
  getLocation: function (data) {
    const { lat, lon, name:city } = data[0];
    document.querySelector(".city").innerText = "Weather in " + city;
    document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?+"+city+"')";
    weather.fetchWeather(lat, lon);
  },
};


const input = document.querySelector('.input-city');
const search = document.querySelector('.search');


search.addEventListener('click',()=>{
      place.fetchPlace(input.value);
});

input.addEventListener('keyup', (event)=>{
    if(event.key=="Enter"){
        place.fetchPlace(input.value);
    }
});

place.fetchPlace("prey veng");

// setTimeout(()=>{
//   document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?weather')";
// },1000);

