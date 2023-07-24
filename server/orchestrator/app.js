const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const [userTypeDefs, userResolvers] = require('./schema/UserSchema')
const [postTypeDefs, postResolvers] = require('./schema/PostSchema')

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs],
    resolvers: [userResolvers, postResolvers],
    introspection: true
  });

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
})
    .then(({ url }) => {
        console.log(`🚀  Server ready at: ${url}`);
    })
    .catch(err => {
        console.log(err)
    })
