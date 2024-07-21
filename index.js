require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const weatherApiKey = process.env.OPENWEATHER_API_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  try {
    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;
    res.json(weatherData);
  } catch (error) {
    res.status(500).send('Error retrieving weather data');
  }
});

app.get('/news', async (req, res) => {
  const newsApiKey = process.env.NEWS_API_KEY;
  const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

  try {
    const newsResponse = await axios.get(newsUrl);
    const newsData = newsResponse.data;
    res.json(newsData);
  } catch (error) {
    res.status(500).send('Error retrieving news data');
  }
});

app.get('/spotify', async (req, res) => {
  const query = req.query.q;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const authOptions = {
    method: 'post',
    url: tokenUrl,
    headers: {
      Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    data: 'grant_type=client_credentials',
    json: true
  };

  try {
    const tokenResponse = await axios(authOptions);
    const accessToken = tokenResponse.data.access_token;

    const spotifyUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;
    const spotifyResponse = await axios.get(spotifyUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    res.json(spotifyResponse.data);
  } catch (error) {
    res.status(500).send('Error retrieving Spotify data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});