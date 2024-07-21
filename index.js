const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  console.log(`Fetching weather data for: ${city}`); // Debugging statement
  try {
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    const weatherData = weatherResponse.data;

    console.log(weatherData); // Debugging statement

    const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=weather&apiKey=${process.env.NEWS_API_KEY}`);
    const newsData = newsResponse.data.articles;

    console.log(newsData); // Debugging statement

    let outfitSuggestion = 'Wear comfortable clothes.';
    let musicSuggestion = 'Chill vibes playlist';

    if (weatherData.main.temp < 10) {
      outfitSuggestion = 'Wear warm clothes like a jacket and scarf.';
      musicSuggestion = 'Cozy winter playlist';
    } else if (weatherData.main.temp > 25) {
      outfitSuggestion = 'Wear light clothes like shorts and a t-shirt.';
      musicSuggestion = 'Summer hits playlist';
    }

    res.json({ weather: weatherData, news: newsData, outfitSuggestion, musicSuggestion });
  } catch (error) {
    console.error('Error fetching data:', error); // Debugging statement
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
