const axios = require("axios");
const cacheService = require("../services/cache");
const URL = process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;
const CACHE_EXPIRE = 3600;

const getCurrentWeatherForLocation = async (req, res) => {
    const { location } = req.params;
    const cacheKey = `weather:${location}`;
    // checking if weather for location is present in cache
    const cachedWeather = await cacheService.get(cacheKey);
    // return if cached
    if (cachedWeather) {
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        const response = await axios.get(
            `${URL}/${location}/?include=current&key=${API_KEY}`
        );
        const result = {
            resolvedAddress: response.data.resolvedAddress,
            address: response.data.address,
            timezone: response.data.timezone,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            weatherData: response.data.days[0],
        };
        // setting to cache with 1 hr exp
        await cacheService.set(cacheKey, JSON.stringify(result), {
            EX: CACHE_EXPIRE,
        });

        res.status(200).json({ data: result });
    }
};

const getDailyWeatherForLocation = async (req, res) => {
    const { location } = req.params;
    const cacheKey = `weather:daily:${location}`;

    // checking if weather for location is present in cache
    const cachedWeather = await cacheService.get(cacheKey);
    // return if cached
    if (cachedWeather) {
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        const response = await axios.get(
            `${URL}/${location}/?include=daily&key=${API_KEY}`
        );

        const result = {
            resolvedAddress: response.data.resolvedAddress,
            address: response.data.address,
            timezone: response.data.timezone,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            weatherData: response.data.days,
        };
        // setting to cache with 1 hr exp
        await cacheService.set(cacheKey, JSON.stringify(result), {
            EX: CACHE_EXPIRE,
        });

        res.status(200).json({ data: result });
    }
};

const getHourlyWeatherForLocation = async (req, res) => {
    const { location } = req.params;
    const cacheKey = `weather:hourly:${location}`;

    // checking if weather for location is present in cache
    const cachedWeather = await cacheService.get(cacheKey);

    // return if cached
    if (cachedWeather) {
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        const response = await axios.get(
            `${URL}/${location}/?include=hours&key=${API_KEY}`
        );
        const result = {
            resolvedAddress: response.data.resolvedAddress,
            address: response.data.address,
            timezone: response.data.timezone,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            weatherData: response.data.days,
        };
        // setting to cache with 1 hr exp
        await cacheService.set(cacheKey, JSON.stringify(result), {
            EX: CACHE_EXPIRE,
        });

        res.status(200).json({ data: result });
    }
};

module.exports = {
    getCurrentWeatherForLocation,
    getDailyWeatherForLocation,
    getHourlyWeatherForLocation,
};
