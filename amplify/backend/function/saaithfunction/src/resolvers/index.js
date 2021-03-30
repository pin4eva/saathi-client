const todoResolvers = require("./todoResolver");
const userResolver = require("./userResolver");

module.exports = {
  Query: { ...todoResolvers.Query, ...userResolver.Query },
  Mutation: { ...todoResolvers.Mutation, ...userResolver.Mutation },
};
