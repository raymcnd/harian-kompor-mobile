function errorHandler(err, req, res, next) {
    let statusCode;
    let errorMsg;

    switch (err.name) {
        default:
            statusCode = 500;
            errorMsg = "Internal server error"
    }

    console.log(err)
    res.status(statusCode).json({message: errorMsg})
}

module.exports = errorHandler