const express = require("express");
const router = express.Router();

const {
    getCurrentWeatherForLocation,
    getDailyWeatherForLocation,
    getHourlyWeatherForLocation,
} = require("../controllers/weather");

router.route("/:location").get(getCurrentWeatherForLocation);
router.route("/:location/daily").get(getDailyWeatherForLocation);
router.route("/:location/hourly").get(getHourlyWeatherForLocation);

module.exports = router;
