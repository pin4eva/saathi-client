const { makeExecutableSchema, gql } = require("apollo-server-express");
const todoType = require("./todoType");
const resolvers = require("../resolvers");
const userType = require("./userType");

const typeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, todoType, userType],
  resolvers,
});

module.exports = schema;
