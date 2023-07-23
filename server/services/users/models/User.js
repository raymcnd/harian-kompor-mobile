const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongoConnect");
const { hashPassword } = require("../helpers/bcryptHelper");

class User {
    static getUsers() {
        const users = getDb().collection("users");
        return users
    }

    static async findAll() {
        try {
            const users = this.getUsers()
            const data = await users.find().toArray()

            return data
        } catch (err) {
            throw err
        }
    }

    static async findById(id) {
        try {
            const users = this.getUsers()
            const data = await users.findOne({_id: new ObjectId(id)})

            return data
        } catch (err) {
            throw err
        }
    }

    static async create(input) {
        try {
            const users = this.getUsers()
            input.password = hashPassword(input.password)
            const data = await users.insertOne(input)
            return data
        } catch (err) {
            throw err
        }
    }

    static async destroy(id) {
        try {
            const users = this.getUsers()
            const data = await users.deleteOne({_id: new ObjectId(id)})

            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = User