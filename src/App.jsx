import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";
import { useRecoilState } from "recoil";
import { USER_ATOM } from "./atoms/userAtom";
import Routes from "./routes";
import "./scss/index.scss";
import jscookie from "js-cookie";
import { TOKEN_NAME } from "./apollo";
import { useQuery } from "@apollo/client";
import { GET_AUTH } from "./apollo/queries/UserQuery";
import { TODO_ATOM } from "./atoms/todoAtom";
import { GET_TODOS } from "./apollo/queries/TodoQuery";
import { API } from "aws-amplify";

const App = () => {
  const [user, setUser] = useRecoilState(USER_ATOM);
  const [todos, setTodos] = useRecoilState(TODO_ATOM);
  const token = jscookie.get(TOKEN_NAME);

  const callAPi = async () => {
    try {
      const data = await API.get("saathi");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  callAPi();

  useQuery(GET_AUTH, {
    onCompleted: (data) => {
      setUser(data.auth);
    },
    onError: (err) => {
      jscookie.remove(TOKEN_NAME);
    },
  });

  useQuery(GET_TODOS, {
    onCompleted: (data) => setTodos(data.getTodos),
    onError: (err) => console.log(err),
  });
  return <Routes isAuth={Boolean(user || token)} />;
};

export default App;
