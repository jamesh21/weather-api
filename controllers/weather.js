const axios = require("axios");

const getWeatherForLocation = async (req, res) => {
    const { zipCode } = req.params;
    // const { startdate, enddate } = req.params;
    const url = process.env.WEATHER_API_URL;
    const apiKey = process.env.WEATHER_API_KEY;

    const response = await axios.get(
        // `${url}/${zipCode}?include=days&key=${apiKey}`
        `${url}/${zipCode}/2024-10-7?include=hours&key=${apiKey}`
    );
    res.status(200).json({ data: response.data.days[0] });
};
module.exports = { getWeatherForLocation };
