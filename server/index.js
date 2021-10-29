const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schemaDefs');
const blogResolvers = require('./blogResolvers');
const server = new ApolloServer({
  typeDefs, 
  blogResolvers, 
});

// hostnetwork for listening
server.listen().then(({ url }) => {
  console.log(` Run Server at ${url}`);
});
