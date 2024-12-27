require("dotenv").config();
const express = require("express");
const app = express();
const weatherRouter = require("./routes/weather");

// routes
app.use("/api/v1/weather", weatherRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
