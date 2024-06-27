// const apiKey = '867146b8d1f1d84578d446f931466f0e';
// const apiKey = '0acf419621d6058ec345c2752ae34f95';
const apiKey = 'e0a910cf9f2a35b506f136dacc4f145f';
const apiurlforcoords = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall';
let unitSystem = 'metric';
const URL = `${apiurlforcoords}?q=${city}&appid=${apiKey}&units=${unitSystem}`;

document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    console.log(city);
    getWeatherData(city);
});

// // for error hadling in promises
// async function fetchUrl(url) {
//     try {
//       const response = await fetch(url);
  
//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error("Unable to find the location");
//       }
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   }


// // async function getcoords(data){

    // const coords = {
    //         lat: data.coord.lon,
    //         lon: data.coord.lat
    //     };
    

// //     return coords;
// // }

// async function getWeatherData(city) {
//     const datawithcoords = await fetchUrl(`${apiurlforcoords}?q=${city}&appid=${apiKey}&units=${unitSystem}`);
//     console.log(datawithcoords);
//     console.log(datawithcoords.corrd);
//     // const coords = getcoords(datawithcoords)
//     console.log(coords);
//     const data = await fetchUrl(`${forecastUrl}?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&appid=${apiKey}`);
//     console.log(data)
//     updateWeatherUI(data)
// }

// function getWeatherData(city) {
//     fetch(`${apiurlforcoords}?q=${city}&appid=${apiKey}&units=metric`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             updateWeatherUI(data);
//             const coords = {
//                 lat: data.coord.lon,
//                 lon: data.coord.lat
//             };
//             console.log(coords.lat)
//             return fetch(`${forecastUrl}?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`);
//         })
//         .then(response => response.json())
//         .then(data => updateForecastUI(data));
// }

async function fetchAndLogData() {
    try {
      const data = await fetchUrl(URL);
      console.log('Weather data:', data);
  
      if (data && data.coord) {
        const coords = {
          lat: data.coord.lat,
          lon: data.coord.lon
        };
        console.log('Coordinates:', coords);
  
        const forecastURL = `${forecastUrl}?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&units=${unitSystem}&appid=${apiKey}`;
        const data2 = await fetchUrl(forecastURL);
        console.log('Forecast data:', data2);
        updateForecastUI(data2)
      } else {
        throw new Error('Coordinates are missing in the weather data');
      }
    } catch (err) {
      console.error('Error:', err); // Log any errors that occur
    }
  }


function updateWeatherUI(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('current-temp').textContent = Math.round(data.main.temp);
    document.getElementById('real-feel').textContent = Math.round(data.main.feels_like);
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('uv-index').textContent = data.current.uvi || '--';
     document.getElementById('rain-chance').textContent = data.clouds.all;
}

function updateForecastUI(data) {
    const weeklyForecast = document.getElementById('weekly-forecast');
    weeklyForecast.innerHTML = '';
    data.daily.forEach((day, index) => {
        if (index === 0) return; // Skip the first day as it's the current day
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-item';
        dayElement.innerHTML = `
            <div>${new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}</div>
            <div>${Math.round(day.temp.day)}°/${Math.round(day.temp.night)}°</div>
            <div>${day.weather[0].description}</div>
        `;
        weeklyForecast.appendChild(dayElement);
    });
}