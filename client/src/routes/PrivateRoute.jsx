import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const { loginUser, isLoading } = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={({ history }) => {
        if (isLoading) return null;
        if (loginUser) return children;
        return history.push("/sign-in");
      }}
    />
  );
}
