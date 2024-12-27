const express = require("express");
const router = express.Router();

const { getWeatherForLocation, getWeather } = require("../controllers/weather");

router.route("/").get(getWeather);
router.route("/:zipCode").get(getWeatherForLocation);

module.exports = router;
