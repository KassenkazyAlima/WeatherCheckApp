document.addEventListener('DOMContentLoaded', () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoidXNlcm5hbWV6bSIsImEiOiJjbHl1eWQwZjcwd2hzMmxxc2trYWNmNWl1In0.Nq6CNHOCcRL31z7eEANXvQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.3488, 48.8534],
    zoom: 9
  });

  async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherResponse = await fetch(`/weather?city=${city}`);
    const weatherData = await weatherResponse.json();

    document.getElementById('weatherData').innerHTML = `
      <h2>Weather in ${weatherData.name}, ${weatherData.sys.country}</h2>
      <p>Temperature: ${weatherData.main.temp}°C</p>
      <p>Feels Like: ${weatherData.main.feels_like}°C</p>
      <p>Weather: ${weatherData.weather[0].description}</p>
      <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="weather icon">
      <p>Coordinates: [${weatherData.coord.lat}, ${weatherData.coord.lon}]</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Pressure: ${weatherData.main.pressure} hPa</p>
      <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
      <p>Rain Volume (last 3 hours): ${weatherData.rain ? weatherData.rain['3h'] : 'No rain'} mm</p>
    `;
    // document.getElementById('weatherData').classList.remove('hidden');

    map.flyTo({
      center: [weatherData.coord.lon, weatherData.coord.lat],
      essential: true
    });

    new mapboxgl.Marker()
      .setLngLat([weatherData.coord.lon, weatherData.coord.lat])
      .addTo(map);

    const newsResponse = await fetch('/news');
    const newsData = await newsResponse.json();
    const articles = newsData.articles.slice(0, 3).map(article => `
      <div class="news-article">
        <h3>${article.title}</h3>
        <img src="${article.urlToImage || ''}" alt="news image" onerror="this.style.display='none'">        <p>${article.description ? article.description : 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `).join('');
    document.getElementById('newsData').innerHTML = `<h2>Top News</h2>${articles}`;
    // document.getElementById('newsData').classList.remove('hidden');

    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    let musicQuery = 'happy';

    if (weatherCondition.includes('rain')) {
      musicQuery = 'rain';
    } else if (weatherCondition.includes('cloud')) {
      musicQuery = 'cloud';
    } else if (weatherCondition.includes('clear')) {
      musicQuery = 'sunny';
    }

    const spotifyResponse = await fetch(`/spotify?q=${weatherData.weather[0].main}`);
    const spotifyData = await spotifyResponse.json();
    const track = spotifyData.tracks.items[0];
    document.getElementById('musicRecommendation').innerHTML = `
      <h2>Recommended Song</h2>
      <iframe src="https://open.spotify.com/embed/track/${track.id}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

      // <div class="spotify-track">
      //   <img src="${track.album.images[0].url}" alt="album cover">
      //   <p>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</p>
      //   <a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a>
      // </div>
    `;
    // document.getElementById('spotifyData').classList.remove('hidden');
  }

  document.querySelector('button').addEventListener('click', getWeather);
});
