const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.response.status || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.response.data || "Something went wrong try again later",
    };
    // console.log(err.response.data);
    // if (err instanceof CustomAPIError) {
    //   return res.status(err.statusCode).json({ msg: err.message })
    // }

    // if (err.name === "ValidationError") {
    //     customError.msg = Object.values(err.errors)
    //         .map((item) => item.message)
    //         .join(",");
    //     customError.statusCode = 400;
    // }
    // if (err.code && err.code === "ERR_BAD_REQUEST") {
    //     customError.msg = `Duplicate value entered for ${Object.keys(
    //         err.keyValue
    //     )} field, please choose another value`;
    //     customError.statusCode = 400;
    // }
    // if (err.name === "CastError") {
    //     customError.msg = `No item found with id : ${err.value}`;
    //     customError.statusCode = 404;
    // }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;