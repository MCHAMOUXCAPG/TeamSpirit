//Delete this file when used the SurveyStatus Component

import React, { useState, useEffect } from "react";

import "./Survey.css";
import SurveyStatus from "../surveyStatus/SurveySatus";
import { ICurrentSurveyResult } from "../../models/interfaces";
import { SurveyService } from "../../services/Services";
import { useAuth } from "../../context/auth";

function Survey() {
  const surveyCode = "Test";
  const token = useAuth().token;
  const [currentSurveyResult, setCurrentSurveyResult] = useState<
    ICurrentSurveyResult
  >({
    Period: {
      StartDate: "",
      EndDate: "",
    },
    Completed: "",
    CurrentResult: 0,
    HistoricResult: 0,
  });
  const [period, setPeriod] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const surveyService: SurveyService = new SurveyService();

  async function getResults(surveyCode: string, token: string) {
    await surveyService
      .getCurrentResult(surveyCode, token)
      .then((res) => {
        setCurrentSurveyResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getResults(surveyCode, token);
  }, []);

  useEffect(() => {
    const startDate = new Date(currentSurveyResult.Period.StartDate);
    const endDate = new Date(currentSurveyResult.Period.EndDate);

    const period =
      startDate.getDate() +
      " " +
      startDate.toLocaleString("default", { month: "short" }) +
      " " +
      startDate.getFullYear() +
      " to " +
      endDate.getDate() +
      " " +
      endDate.toLocaleString("default", { month: "short" }) +
      " " +
      endDate.getFullYear();

    setPeriod(period);
  }, [currentSurveyResult]);

  return (
    <SurveyStatus
      loading={loading}
      period={period}
      completed={currentSurveyResult.Completed}
      currentResult={currentSurveyResult.CurrentResult}
      historicResult={currentSurveyResult.HistoricResult}
    />
  );
}

export default Survey;
