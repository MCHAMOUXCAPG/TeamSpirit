import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/homePage/HomePage";
import Survey from "./components/survey/Survey";
import ExitPage from "./components/exitPage/ExitPage";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthContext } from "./context/auth";
import TeamHomePage from "./components/teamHomePage/TeamHomePage";

function App() {
  const [valid, setValid] = useState(false);
  return (
    <AuthContext.Provider value={{ valid: valid, setValid: setValid }}>
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
