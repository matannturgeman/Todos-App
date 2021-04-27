import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInForm from "../pages/SignInForm/SignInForm";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import UserTodosPage from "../pages/UserTodosPage/UserTodosPage";
import PrivateRoute from "./PrivateRoute";

function AppPages() {
  return (
    <Switch>
      <PrivateRoute path="/todos" exact>
        <UserTodosPage />
      </PrivateRoute>
      <Route path="/sign-in" component={SignInForm} />
      <Route path="/register" component={RegisterForm} />
      <Redirect to="/todos" />
    </Switch>
  );
}

export default AppPages;
