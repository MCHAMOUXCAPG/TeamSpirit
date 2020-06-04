import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import Survey from "./components/survey/Survey";
import ExitPage from "./components/exitPage/ExitPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/success" element={<ExitPage />} />
      </Routes>
    </Router>
  );
}

export default App;
