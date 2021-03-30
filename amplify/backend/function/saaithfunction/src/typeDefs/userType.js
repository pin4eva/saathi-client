const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID
    name: String
    email: String
    username: String
    token: String
    otp: String
    todos: [Todo]
    googleId: String
    facebookId: String
  }

  extend type Query {
    getUsers: [User]
    auth: User
  }

  extend type Mutation {
    signup(input: UserInput): User
    login(email: String, password: String): User
    deleteUser(email: String): Boolean
    verifyToken(otp: String): User
    googleLogin(googleId: String): User
    googleSignup(input: UserInput): User
    facebookLogin(facebookId: String): User
    facebookSignup(input: UserInput): User
  }

  input UserInput {
    name: String
    email: String
    username: String
    password: String
    googleId: String
    facebookId: String
  }
`;
