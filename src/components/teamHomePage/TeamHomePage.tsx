import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
import AverageChart from "../averageChart/Chart";

import "./TeamHomePage.css";
import "../surveyStatus/SurveyStatus.css";
import SurveyStatus from "../surveyStatus/SurveySatus";
import { ICurrentSurveyResult } from "../../models/interfaces";
import { SurveyService } from "../../services/Services";
import DetailResults from "../detailResults/DetailResults";
import ExportResult from "../exportResult/ExportResult";

const TeamHomePage = () => {
  const surveyCode = "Test1";
  const token = sessionStorage.getItem("token");
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

  async function getResults(surveyCode: string, token: string | null) {
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
    <div>
      <NavBar user={true}></NavBar>
      <Container maxWidth="lg" className="content" disableGutters={true}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item xs={12}>
            <div className="team-name">Team Name</div>
          </Grid>
          <Grid item xs={12} md={6}>
            <AverageChart
              loading={loading}
              grade={parseFloat(currentSurveyResult.CurrentResult.toFixed(2))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SurveyStatus
              loading={loading}
              period={period}
              completed={currentSurveyResult.Completed}
              currentResult={currentSurveyResult.CurrentResult}
              historicResult={currentSurveyResult.HistoricResult}
            />
          </Grid>
          <Grid item xs={12}>
            <ExportResult />
          </Grid>
          <Grid item xs={12}>
            <DetailResults />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TeamHomePage;
