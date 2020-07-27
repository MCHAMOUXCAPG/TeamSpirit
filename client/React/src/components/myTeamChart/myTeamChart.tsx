import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { SurveyService } from "../../services/Services";
import AverageChart from "../averageChart/Chart";
import { ICurrentSurveyResult } from "../../models/interfaces";
import Schedule from "@material-ui/icons/Schedule";
import colors from "../../config/colors";

const MyTeamChart = (props: any) => {
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
  const [noData, setNotData] = useState(false);
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
        let newAllowClick: string[] = props.allowClickTeams;
        newAllowClick.push(teamName);
        props.setAllowClickTeams(newAllowClick);
      });
  }
  useEffect(() => {
    getResults(props.teamName, token);
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12} className="team">
        {props.teamName}
      </Grid>

      {noData ? (
        <Grid container direction="row" justify="center">
          <Grid item xs={12}>
            <p className="error-message">
              Please contact with the Team Spirit Administrator, you don't have
              any surveys for this team.
            </p>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} className="grid-chart">
            <AverageChart
              loading={loading}
              grade={parseFloat(currentSurveyResult.CurrentResult.toFixed(2))}
            />
          </Grid>
          <Grid item xs={12}>
            <p style={{ color: colors.primary }}>
              <Schedule className="icon" />
              Historic result: &nbsp;
              <span style={{ color: colors.black }}>
                {parseFloat(currentSurveyResult.HistoricResult.toFixed(2))}/10
              </span>
            </p>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default MyTeamChart;
