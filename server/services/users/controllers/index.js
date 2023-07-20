const User = require("../models/User");

class Controller {
    static async readUsers(req, res, next) {
        try {
            const data = await User.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async readUserById(req, res, next) {
        try {
            const { id } = req.params
            const data = await User.findById(id)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const data = await User.create({
                username, email, password, role: "admin", phoneNumber, address,
                createdAt: new Date(), updatedAt: new Date()
            })
            res.status(200).json(`User #${data.insertedId} created`)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller