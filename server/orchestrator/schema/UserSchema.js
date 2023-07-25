const axios = require('axios')
const redis = require('../config/redisConfig')
const appBaseUrl = "http://app-service-container:4002/pub"
const usersBaseUrl = "http://users-service-container:4001"

// const appBaseUrl = "http://localhost:4002/pub"
// const usersBaseUrl = "http://localhost:4001"

const typeDefs = `#graphql
    type User {
        _id: ID!
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type Message {
        message: String
    }

    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
    }

    input NewUser {
        username: String!
        email: String!
        password: String!
        phoneNumber: String
        address: String
    }

    type Mutation {
        addUser(newUser: NewUser): Message
        deleteUser(id: ID!): Message
    }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                const usersCache = await redis.get("users");

                if (usersCache) {
                    const data = JSON.parse(usersCache);
                    return data;
                } else {
                    const { data } = await axios.get(usersBaseUrl + "/users");
                    await redis.set("users", JSON.stringify(data))
                    return data;
                }
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        getUserById: async (_, args) => {
            try {
                const { data } = await axios({url: usersBaseUrl + "/users/" + args.id})
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    },
    Mutation: {
        addUser: async(_, args) => {
            try {
                const { data } = await axios({
                    url: usersBaseUrl + "/users",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(args.newUser)
                })
                await redis.del('users')
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        deleteUser: async(_, args) => {
            try {
                const { data } = await axios({
                    url: usersBaseUrl + "/users/" + args.id,
                    method: "DELETE",
                })
                await redis.del('users')
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }
}

module.exports = [typeDefs, resolvers]

