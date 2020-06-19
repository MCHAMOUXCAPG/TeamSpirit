import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/homePage/HomePage";
import Survey from "./components/survey/Survey";
import ExitPage from "./components/exitPage/ExitPage";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthContext } from "./context/auth";

function App() {
  const [valid, setValid] = useState(true);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXJAbWFpbC5jb20iLCJQYXNzd29yZCI6IjEyMzQ1NiIsImV4cCI6MTU5MjY2MzA1MX0.KUKPMjY3U-o79RaPnckolg_QUyzc5nPQLfkSlFdWxy0"
  ); // here put your token until we make the login page
  return (
    <AuthContext.Provider
      value={{
        valid: valid,
        setValid: setValid,
        token: token,
        setToken: setToken,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<ExitPage />} />
          <PrivateRoute
            path="/survey"
            element={<Survey />}
            alternativePath="/"
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
