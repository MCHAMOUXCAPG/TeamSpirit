import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/homePage/HomePage";
import Survey from "./components/survey/Survey";
import ExitPage from "./components/exitPage/ExitPage";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthContext } from "./context/auth";

function App() {
  const [valid, setValid] = useState(false);
  const [surveyCode, setSurveyCode] = useState("");
  return (
    <AuthContext.Provider
      value={{
        valid: valid,
        surveyCode: surveyCode,
        setValid: setValid,
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
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
