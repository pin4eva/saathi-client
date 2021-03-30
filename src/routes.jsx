import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import FrontLayout from "./layouts/FrontLayout";
import AuthPage from "./pages/AuthPage";
import DHomePage from "./pages/dashboard/DHome";
import TodosPage from "./pages/dashboard/TodosPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const ErrorLayout = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuth,
  proctected,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (proctected) {
          if (isAuth) {
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            );
          } else {
            return <Redirect to="/" />;
          }
        } else {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
      }}
    />
  );
};

const Routes = ({ isAuth }) => {
  return (
    <Router>
      <Switch>
        <AppRoute
          exact
          path="/"
          proctected={false}
          component={HomePage}
          layout={FrontLayout}
        />
        <AppRoute
          exact
          path="/auth"
          component={AuthPage}
          layout={FrontLayout}
          proctected={false}
        />

        <AppRoute
          exact
          path="/login"
          component={LoginPage}
          layout={AuthLayout}
          proctected={false}
        />
        <AppRoute
          exact
          path="/register"
          component={RegisterPage}
          layout={AuthLayout}
          proctected={false}
        />

        <AppRoute
          exact
          path="/dashboard"
          component={DHomePage}
          layout={DashboardLayout}
          proctected={true}
          isAuth={isAuth}
        />

        <AppRoute
          exact
          path="/dashboard/todos"
          component={TodosPage}
          layout={DashboardLayout}
          proctected={true}
          isAuth={isAuth}
        />

        <AppRoute
          component={ErrorPage}
          layout={ErrorLayout}
          proctected={false}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
