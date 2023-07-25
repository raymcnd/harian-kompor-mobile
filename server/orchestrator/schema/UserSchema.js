const axios = require('axios')

const appBaseUrl = "http://localhost:4002/pub"
const usersBaseUrl = "http://localhost:4001"

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
                const { data } = await axios({url: usersBaseUrl + "/users"})
                return data
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
        
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }
}

module.exports = [typeDefs, resolvers]

