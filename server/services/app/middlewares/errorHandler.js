function errorHandler(err, req, res, next) {
    let codeStatus;
    let errorMsg;
    
    switch(err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            codeStatus = 400;
            errorMsg = err.errors[0].message;
            break;
        case "NullEmail":
            codeStatus = 400;
            errorMsg = "Email is required";
            break;
        case "NullPassword":
            codeStatus = 400;
            errorMsg = "Password is required";
            break;
        case "InvalidEmailPassword":
            codeStatus = 401;
            errorMsg = "Invalid email/password";
            break;
        case "NotAuthenticated":
        case "JsonWebTokenError":
            codeStatus = 401;
            errorMsg = "Invalid token";
            break;
        case "NotFound":
            codeStatus = 404;
            errorMsg = "Data not found";
            break;
        default:
            codeStatus = 500;
            errorMsg = "Internal server error";
    }

    console.log(err)
    res.status(codeStatus).json({message: errorMsg})
}

module.exports = errorHandler