

# WeatherCheckApp 🌦️🎵



Welcome to **WeatherCheckApp** - your all-in-one weather and news application with music recommendations! Get real-time weather updates, the latest news headlines, and music suggestions that match the current weather. 🌍📰🎶

## Features

- **Weather Information**: Get real-time weather data including temperature, description, coordinates, feels-like temperature, humidity, pressure, wind speed, country code, and rain volume for the last 3 hours.
- **Geolocation and Mapping**: Visually display the geographical locations of cities using Mapbox.
- **Top News**: Stay updated with the latest news headlines.
- **Recommended Music**: Enjoy music recommendations based on the current weather.

## Installation

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/KassenkazyAlima/WeatherCheckApp.git
   cd WeatherCheckApp
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Create a `.env` File**:
   Add your API keys in a `.env` file in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key
   NEWS_API_KEY=your_news_api_key
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   MAPBOX_API_KEY=your_mapbox_api_key
   ```

4. **Run the Application**:
   ```sh
   npx nodemon index.js
   ```

5. **Open the Application**:
   Open your browser and go to `http://localhost:3000`

## Usage

1. **Enter City Name**:
   - Type the city name in the input field and click "Get Weather".
2. **View Weather Information**:
   - The weather information will be displayed, including temperature, weather description, and more.
3. **Check the Map**:
   - The map will show the geographical location of the entered city.
4. **Read the News**:
   - Scroll down to see the latest news headlines.
5. **Listen to Music**:
   - Enjoy the recommended song based on the current weather.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **APIs**: OpenWeatherAPI, NewsAPI, Spotify API, Mapbox

## Contributing

Feel free to contribute to this project by opening an issue or submitting a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [OpenWeatherAPI](https://openweathermap.org/api)
- [NewsAPI](https://newsapi.org/)
- [Spotify for Developers](https://developer.spotify.com/)
- [Mapbox](https://www.mapbox.com/)

---

Thank you for checking out **WeatherCheckApp**! We hope you enjoy using it as much as we enjoyed building it. ☀️🌧️🎧
