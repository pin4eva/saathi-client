const { gql } = require("apollo-server-express");

module.exports = gql`
  type Todo {
    id: ID
    title: String
    body: String
    completed: Boolean
    userId: ID
  }

  extend type Query {
    getTodos: [Todo]!
    getUserTodos: [Todo]
  }
  extend type Mutation {
    addTodo(title: String, body: String): Todo!
    deleteTodo(id: ID): Boolean
    updateTodo(id: ID, title: String, body: String): Todo
    markCompleted(id: ID): Boolean
    deleteAllTodos: Boolean
  }
`;
