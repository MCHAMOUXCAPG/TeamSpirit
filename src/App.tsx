import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/homePage/HomePage";
import Survey from "./components/survey/Survey";
import ExitPage from "./components/exitPage/ExitPage";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthContext } from "./context/auth";
import TeamHomePage from "./components/teamHomePage/TeamHomePage";

function App() {
  const [valid, setValid] = useState(true);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFuYXNAY2FwZ2VtaW5pLmNvbSIsIlBhc3N3b3JkIjoiIiwiZXhwIjoxNTkzNjc2NTQzfQ.yZgaOh500yG4Zk-FIxx7sD7DuD9QzB6IW1m5X4shKbk"
  ); // here put your token until we make the login page
  const [surveyCode, setSurveyCode] = useState("");
  return (
    <AuthContext.Provider
      value={{
        valid: valid,
        setValid: setValid,
        token: token,
        setToken: setToken,
        surveyCode: surveyCode,
        setSurveyCode: setSurveyCode,
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
          <Route path="/teamleader" element={<TeamHomePage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
