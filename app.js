require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");
const weatherRouter = require("./routes/weather");

app.use(express.json());
// routes
app.use("/api/v1/weather", weatherRouter);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
