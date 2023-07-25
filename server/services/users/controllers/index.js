const { hashPassword } = require("../helpers/bcryptHelper");
const User = require("../models/User");

class Controller {
    static async readUsers(req, res, next) {
        try {
            let data = await User.findAll()
            data = data.map(e => {
                delete e.password
                return e
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async readUserById(req, res, next) {
        try {
            const { id } = req.params
            const data = await User.findById(id)
            delete data.password
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const data = await User.create({
                username, email, password, role: "admin", phoneNumber, address
            })
            res.status(201).json({message: `User _id: ${data.insertedId} created`})
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            await User.destroy(id)
            res.status(200).json({message: `User _id: ${id} deleted`})
        } catch (err) {
            next(err)   
        }
    }
}

module.exports = Controller