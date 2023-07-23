const bcrypt = require('bcryptjs');
const saltRounds = 13;

function hashPassword(plain) {
    const salt = bcrypt.genSaltSync(13);
    const hash = bcrypt.hashSync(plain, salt);

    return hash
}

function comparePassword(plain, hash) {
    return bcrypt.compareSync(plain, hash)
}

module.exports = { hashPassword, comparePassword }