const axios = require("axios");
const cacheService = require("../services/cache");
const URL = process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;
const CACHE_EXPIRE = 3600;

const getCurrentWeatherForLocation = async (req, res) => {
    const { zipCode } = req.params;
    const cacheKey = `weather:${zipCode}`;
    // checking if weather for zipcode is present in cache
    const cachedWeather = await cacheService.get(cacheKey);
    // return if cached
    if (cachedWeather) {
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        const response = await axios.get(
            `${URL}/${zipCode}/?include=current&key=${API_KEY}`
        );
        // setting to cache with 1 hr exp
        await cacheService.set(
            cacheKey,
            JSON.stringify(response.data.days[0]),
            {
                EX: CACHE_EXPIRE,
            }
        );

        res.status(200).json({ data: response.data.days[0] });
    }
};

const getDailyWeatherForLocation = async (req, res) => {
    const { zipCode } = req.params;
    const cacheKey = `weather:daily:${zipCode}`;
    console.log(cacheKey);
    // checking if weather for zipcode is present in cache
    const cachedWeather = await cacheService.get(cacheKey);
    // return if cached
    if (cachedWeather) {
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        const response = await axios.get(
            `${URL}/${zipCode}/?include=daily&key=${API_KEY}`
        );
        // setting to cache with 1 hr exp
        await cacheService.set(cacheKey, JSON.stringify(response.data.days), {
            EX: CACHE_EXPIRE,
        });

        res.status(200).json({ data: response.data.days });
    }
};

const getHourlyWeatherForLocation = async (req, res) => {
    const { zipCode } = req.params;
    const cacheKey = `weather:hourly:${zipCode}`;

    // checking if weather for zipcode is present in cache
    const cachedWeather = await cacheService.get(cacheKey);

    // return if cached
    if (cachedWeather) {
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        const response = await axios.get(
            `${URL}/${zipCode}/?include=hours&key=${API_KEY}`
        );
        // setting to cache with 1 hr exp
        await cacheService.set(cacheKey, JSON.stringify(response.data.days), {
            EX: CACHE_EXPIRE,
        });

        res.status(200).json({ data: response.data.days });
    }
};

module.exports = {
    getCurrentWeatherForLocation,
    getDailyWeatherForLocation,
    getHourlyWeatherForLocation,
};
