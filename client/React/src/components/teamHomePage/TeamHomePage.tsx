import React, { useState, useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
import AverageChart from "../averageChart/Chart";
import "./TeamHomePage.css";
import "../surveyStatus/SurveyStatus.css";
import SurveyStatus from "../surveyStatus/SurveySatus";
import {
  ICurrentSurveyResult,
  IResultsByUsers,
  IResultsByQuestions,
} from "../../models/interfaces";
import { SurveyService } from "../../services/Services";
import DetailResults from "../detailResults/DetailResults";
import ExportResult from "../exportResult/ExportResult";
import { AuthContext } from "../../context/auth";
import { reRender } from "../../components/surveyStatus/SurveySatus";
const TeamHomePage = () => {
  function useForceUpdate() {
    // eslint-disable-next-line
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => ++value); // update the state to force render
  }

  const [noData, setNotData] = useState(false);
  const contextRender = useContext(reRender);
  const forceUpdate = useForceUpdate();
  const context = useContext(AuthContext);
  const token = sessionStorage.getItem("token");
  const [currentDetailResultsUsers, setCurrentDetailResultsUsers] = useState<
    IResultsByUsers[]
  >();

  const [
    currentDetailResultsQuestions,
    setCurrentDetailResultsQuestions,
  ] = useState<IResultsByQuestions[]>();
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

  async function getResults(teamName: string, token: string | null) {
    await surveyService
      .getCurrentResult(teamName, token)
      .then((res) => {
        setNotData(false);
        setCurrentSurveyResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setNotData(true);
      });
  }
  async function getResultsByUser(teamName: string, token: string | null) {
    await surveyService
      .getResultByUser(teamName, token)
      .then((res) => {
        setNotData(false);
        setCurrentDetailResultsUsers(res.data);
      })
      .catch((err) => {
        setNotData(true);
      });
  }

  async function getResultsByQuestion(teamName: string, token: string | null) {
    await surveyService
      .getResultByQuestions(teamName, token)
      .then((res) => {
        setNotData(false);
        setCurrentDetailResultsQuestions(res.data);
      })
      .catch((err) => {
        setNotData(true);
      });
  }

  useEffect(() => {
    getResults(context.currentTeam, token);
    getResultsByUser(context.currentTeam, token);
    getResultsByQuestion(context.currentTeam, token);
    // eslint-disable-next-line
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
  useEffect(() => {
    getResults(context.currentTeam, token);
    forceUpdate();
    contextRender.setRender(false);
    // eslint-disable-next-line
  }, [contextRender.render]);
  return (
    <div>
      <NavBar user={true}></NavBar>
      {noData ? (
        <Grid container direction="row" justify="center">
          <Grid item xs={12}>
            <div className="team-name">{context.currentTeam}</div>
          </Grid>
          <Grid item xs={12}>
            <p className="error-message">
              Please contact with the Team Spirit Administrator, you don't have
              any surveys for this team.
            </p>
          </Grid>
        </Grid>
      ) : (
        <Container maxWidth="lg" className="content" disableGutters={true}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={12}>
              <div className="team-name">{context.currentTeam}</div>
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
                teamName={context.currentTeam}
              />
            </Grid>
            <Grid item xs={12}>
              <ExportResult teamName={context.currentTeam} />
            </Grid>
            <Grid item xs={12}>
              <DetailResults
                usersResult={currentDetailResultsUsers}
                questionsResult={currentDetailResultsQuestions}
                completed={currentSurveyResult.Completed}
                noData={noData}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default TeamHomePage;
