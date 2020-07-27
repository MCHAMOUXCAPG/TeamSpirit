import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

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
