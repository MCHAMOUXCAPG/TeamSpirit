import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

// Component that depending on the context can redirect to a public or private route
function PrivateRoute({
  element,
  path,
  alternativePath,
}: {
  element: JSX.Element;
  path: string;
  alternativePath: string;
}) {
  const isAuthenticated = useAuth().valid;

  return (
    <>
      {isAuthenticated ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to={alternativePath} />
      )}
    </>
  );
}

export default PrivateRoute;
