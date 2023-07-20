function errorHandler(err, req, res, next) {
    let codeStatus;
    let errorMsg;

    switch (err.name) {
        default:
            codeStatus = 500;
            errorMsg = "Internal server error"
    }

    console.log(err)
    res.status(codeStatus).json({message: errorMsg})
}

module.exports = errorHandler