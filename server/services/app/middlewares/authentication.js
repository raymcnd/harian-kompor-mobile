const { verifyToken } = require("../helpers/jwtHelper");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
        const payload =  verifyToken(access_token);
        const targetUser = await User.findByPk(payload.id);
        if (!targetUser) throw {name: "NotAuthenticated"};
        req.user = payload
        next();
    } catch (err) {
        next(err)
    }
}

module.exports = authentication