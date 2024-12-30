const axios = require("axios");
const cacheService = require("../services/cache");

const getWeatherForLocation = async (req, res) => {
    const { zipCode } = req.params;
    const url = process.env.WEATHER_API_URL;
    const apiKey = process.env.WEATHER_API_KEY;

    const cachedWeather = await cacheService.get(`weather:${zipCode}`);
    if (cachedWeather) {
        console.log("Cache Hit");
        res.status(200).json({ data: JSON.parse(cachedWeather) });
    } else {
        console.log("Cache Miss");
        const response = await axios.get(
            `${url}/${zipCode}/?include=current&key=${apiKey}`
        );
        await cacheService.set(
            `weather:${zipCode}`,
            JSON.stringify(response.data.days[0]),
            {
                EX: 3600,
            }
        );
        res.status(200).json({ data: response.data.days[0] });
    }
};

module.exports = { getWeatherForLocation };
