const axios = require('axios')
const redis = require('../config/redisConfig')
const appBaseUrl = "http://app-service-container:4002/pub"
const usersBaseUrl = "http://users-service-container:4001"

// const appBaseUrl = "http://localhost:4002/pub"
// const usersBaseUrl = "http://localhost:4001"

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
        createdAt: String
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

    input PostInput {
        title: String!
        content: String!
        imgUrl: String
        categoryId: String
        tags: [String]
    }

    type Query {
        getPosts: [Post]
        getPostById(id: ID!): PostDetail
    }

    type Mutation {
        addPost(postInput: PostInput): Message
        updatePost(id:ID!, postInput: PostInput): Message
        deletePost(id: ID): Message
    }
`;

const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const postsCache = await redis.get("posts");

                if (postsCache) {
                    const data = JSON.parse(postsCache);
                    return data;
                } else {
                    const { data } = await axios.get(appBaseUrl + "/posts");
                    await redis.set("posts", JSON.stringify(data))
                    return data
                }
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
        },
    },
    Mutation: {
        addPost: async(_, args) => {
            try {
                const { data } = await axios({
                    url: appBaseUrl + "/posts",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(args.postInput)
                })
                await redis.del('posts')
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        updatePost: async(_, args) => {
            try {
                const { data } = await axios({
                    url: appBaseUrl + "/posts/" + args.id,
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(args.postInput)
                })
                await redis.del('posts')
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        },
        deletePost: async(_, args) => {
            try {
                const { data } = await axios({
                    url: appBaseUrl + "/posts/" + args.id,
                    method: "DELETE"
                })
                await redis.del('posts')
                return data
            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }
}

module.exports = [typeDefs, resolvers]