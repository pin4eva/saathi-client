import { gql } from "@apollo/client";

export const GET_USERS = gql`
  {
    id
    name
    email
    username
  }
`;

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      id
      name
      email
      otp
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($input: UserInput) {
    signup(input: $input) {
      id
      name
      email
      username
    }
  }
`;

export const GET_AUTH = gql`
  {
    auth {
      id
      name
      email
      username
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation Verify($otp: String) {
    verifyToken(otp: $otp) {
      id
      name
      email
      name
      token
    }
  }
`;

export const GOOGLE_SIGNUP = gql`
  mutation($input: UserInput) {
    googleSignup(input: $input) {
      token
      email
      name
      id
      username
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($googleId: String) {
    googleLogin(googleId: $googleId) {
      token
      email
      name
      id
      username
    }
  }
`;
