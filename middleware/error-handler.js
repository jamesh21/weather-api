const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.response.status || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.response.data || "Something went wrong try again later",
    };

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
