const axios = require('axios')
const redis = require('../config/redisConfig')
const appBaseUrl = "http://localhost:4002/pub"
const usersBaseUrl = "http://localhost:4001"


class Controller {
    static async readPosts(req, res, next) {
        try {
            const postsCache = await redis.get("posts");

            if (postsCache) {
                const data = JSON.parse(postsCache);
                res.status(200).json(data);
            } else {
                const { data } = await axios.get(appBaseUrl + "/posts");
                await redis.set("posts", JSON.stringify(data))
                res.status(200).json(data);
            }
        } catch (err) {
            next(err)
        }
    }

    static async readPostById(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios.get(appBaseUrl + "/posts/" + id);
            const { data: authorMongo } = await axios.get(usersBaseUrl + "/users/" + data.authorMongoId);
            data.authorMongo = authorMongo
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async readUsers(req, res, next) {
        try {
            const usersCache = await redis.get("users");

            if (usersCache) {
                const data = JSON.parse(usersCache);
                res.status(200).json(data);
            } else {
                const { data } = await axios.get(usersBaseUrl + "/users");
                await redis.set("users", JSON.stringify(data))
                res.status(200).json(data);
            }
        } catch (err) {
            next(err)
        }
    }

    static async readUserById(req, res, next) {
        try {
            const { id } = req.params;
            const { data } = axios.get(usersBaseUrl + "/users/" + id);
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async createUser(req, res, next) {
        try {
            const body = req.body;
            const { data } = await axios({
                url: usersBaseUrl + "/users",
                method: 'post',
                data: body
            })
            await redis.del('users')
            res.status(201).json({message: data})
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const { data } = await axios({
                url: usersBaseUrl + "/users/" + id,
                method: 'delete'
            })
            await redis.del('users')
            res.status(200).json({message: data})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller