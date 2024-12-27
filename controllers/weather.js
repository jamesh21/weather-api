const getWeather = async (req, res) => {
    res.send("get weather");
};
const getWeatherForLocation = async (req, res) => {
    res.send("weather for this zip code");
};
module.exports = { getWeatherForLocation, getWeather };
