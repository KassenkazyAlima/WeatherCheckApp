async function getWeather() {
    const city = document.getElementById('cityInput').value;
    try {
      console.log(`Fetching data for city: ${city}`); // Debugging statement
      const response = await fetch(`/weather?city=${city}`);
      const data = await response.json();
      console.log(data); // Debugging statement
      displayWeather(data.weather);
      displayNews(data.news);
      displaySuggestions(data.outfitSuggestion, data.musicSuggestion);
      displayMap(data.weather.coord.lat, data.weather.coord.lon);
    } catch (error) {
      console.error('Error fetching weather data:', error); // Debugging statement
    }
  }
  
  function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = `
      <h2>Weather in ${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Description: ${data.weather[0].description}</p>
      <p>Feels like: ${data.main.feels_like}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Pressure: ${data.main.pressure} hPa</p>
      <p>Wind speed: ${data.wind.speed} m/s</p>
    `;
  }
  
  function displayNews(news) {
    const newsDiv = document.getElementById('newsData');
    newsDiv.innerHTML = '<h3>Weather News</h3>';
    news.forEach(article => {
      newsDiv.innerHTML += `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`;
    });
  }
  
  function displaySuggestions(outfit, music) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = `
      <h3>Suggestions</h3>
      <p>Outfit: ${outfit}</p>
      <p>Music: ${music}</p>
    `;
  }
  
  function displayMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = ''; // Clear previous map
    const map = new google.maps.Map(mapDiv, {
      center: { lat, lng: lon },
      zoom: 8
    });
    new google.maps.Marker({
      position: { lat, lng: lon },
      map: map
    });
  }
  