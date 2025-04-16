import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { Spinner } from "@app/_shared";
import React from "react";
import { Navigate } from "react-router-dom";

const withGuest = (Component) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <Spinner />; // Show a spinner while authentication status is loading
    }

    if (isAuthenticated) {
      return <Navigate to="/dashboards/misc" />; // Redirect authenticated users
    }

    return <Component {...props} />;
  };
};

export default withGuest;
