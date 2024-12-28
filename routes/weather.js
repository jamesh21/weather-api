const express = require("express");
const router = express.Router();

const { getWeatherForLocation } = require("../controllers/weather");

router.route("/:zipCode").get(getWeatherForLocation);

module.exports = router;
