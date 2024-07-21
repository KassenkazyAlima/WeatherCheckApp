# Weather Checking App

## Description
The current web application is created for showing the weather using the API called OpenWeatherAPI, which also shows the news of the day and provides suggestion for appropriate outfit.

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file and add your API keys:
4. Start the server: `npm start`
5. Open `http://localhost:3000` in your browser

## API Usage
- `/weather?city={city_name}`: Fetch weather data, news, and suggestions for the specified city.

## Design Decisions
- Used Express for the server
- Used Axios for API requests
- Frontend built with vanilla JS, HTML, and CSS for simplicity
- Google Maps API for displaying maps

## Dependencies
- express
- axios
- dotenv
