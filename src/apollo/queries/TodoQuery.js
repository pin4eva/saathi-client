import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddTodo($title: String, $body: String) {
    addTodo(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export const GET_TODOS = gql`
  {
    getTodos {
      id
      title
      completed
      body
    }
  }
`;

export const MARK_COMPLETED = gql`
  mutation MarkCompleted($id: ID) {
    markCompleted(id: $id)
  }
`;

export const DELETE_TODO = gql`
  mutation($id: ID) {
    deleteTodo(id: $id)
  }
`;
