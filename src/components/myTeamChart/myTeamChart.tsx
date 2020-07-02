import React, { useContext, useState, useEffect } from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import { SurveyService } from "../../services/Services";
import AverageChart from "../averageChart/Chart";
import { ICurrentSurveyResult } from "../../models/interfaces";
import { AuthContext } from "../../context/auth";
import Schedule from "@material-ui/icons/Schedule";
const MyTeamChart = (props: any) => {
  const context = useContext(AuthContext);
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

  const [loading, setLoading] = useState(true);
  const surveyService: SurveyService = new SurveyService();
  async function getResults(teamName: string, token: string | null) {
    await surveyService
      .getCurrentResult(teamName, token)
      .then((res) => {
        setCurrentSurveyResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getResults(props.teamName, token);
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12} className="team">
        {props.teamName}
      </Grid>
      <Grid item xs={12} className="grid-chart">
        <AverageChart
          loading={loading}
          grade={parseFloat(currentSurveyResult.CurrentResult.toFixed(2))}
        />
      </Grid>
      <Grid item xs={12}>
        <p style={{ color: "#79C0C6" }}>
          <Schedule className="icon" />
          Historic result: &nbsp;
          <span style={{ color: "#000000" }}>
            {parseFloat(currentSurveyResult.HistoricResult.toFixed(2))}/10
          </span>
        </p>
      </Grid>
    </Grid>
  );
};
export default MyTeamChart;
