# Weather API

## Project Description
This project is a weather api built using Node.js. This node app calls a third party api (Visual Crossing) for weather data and then stores results in a Redis Cache.
The purpose of this project is to practice using third party APIs, caching, env variables, and rate limiters.

## API endpoints
/api/v1/weather/:location - returns current weather for location (passed in location, can be zip code, address, or city)\
/api/v1/weather/:location/daily - returns 14 day weather for location (passed in location, can be zip code, address, or city)\
/api/v1/weather/:location/hourly - returns 14 day hourly weather for location (passed in location, can be zip code, address, or city)

## Requirements
[Node.js](https://nodejs.org/en)\
[Redis](https://redis.io/) (local or cloud instance)\
[Visual Crossing](https://www.visualcrossing.com/) Weather API Key

## How to Run
1. Clone repo
2. run `npm install`
3. Create .env file and Add environmental variables below
   - WEATHER_API_KEY
   - WEATHER_API_URL
   - REDIS_CONNECTION_URL
4. start redis server
5. run `npm start`


## Credits
This project idea is from [roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service)
