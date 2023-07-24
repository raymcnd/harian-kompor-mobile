const axios = require('axios')

const appBaseUrl = "http://localhost:4002/pub"
const usersBaseUrl = "http://localhost:4001"

const typeDefs = `#graphql
    type Post {
        id: ID
        title: String
        content: String
        imgUrl: String
        categoryId: String
        authorMongoId: String
        createdAt: String
        Category: Category
        Tags: [Tag]
    }

    type PostDetail {
        id: ID
        title: String
        content: String
        imgUrl: String
        categoryId: String
        authorMongoId: String
        authorMongo: Author
        Category: Category
        Tags: [Tag]
    }
    
    type Category {
        name: String
    }

    type Tag {
        name: String
    }

    type Author {
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
        getPosts: [Post]
        getPostById(id: ID!): PostDetail
    }
`;

const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const { data } = await axios({url: appBaseUrl + "/posts"})
                // data.id = String(data.id)
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        getPostById: async (_, args) => {
            try {
                const { data } = await axios({url: appBaseUrl + "/posts/" + args.id})
                const { data: authorMongo } = await axios.get(usersBaseUrl + "/users/" + data.authorMongoId)
                // data.id = String(data.id)
                data.authorMongo = authorMongo
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    },
    // Mutation: {
    //     addUser: async(_, args) => {
    //         console.log(args)
    //         return {message: "Masuk"}
    //     }
    // }
}

module.exports = [typeDefs, resolvers]