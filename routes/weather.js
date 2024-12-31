const express = require("express");
const router = express.Router();

const {
    getCurrentWeatherForLocation,
    getDailyWeatherForLocation,
    getHourlyWeatherForLocation,
} = require("../controllers/weather");

router.route("/:zipCode").get(getCurrentWeatherForLocation);
router.route("/:zipCode/daily").get(getDailyWeatherForLocation);
router.route("/:zipCode/hourly").get(getHourlyWeatherForLocation);

module.exports = router;
