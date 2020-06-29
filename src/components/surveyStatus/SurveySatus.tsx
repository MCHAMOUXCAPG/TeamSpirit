import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Settings from "@material-ui/icons/Settings";
import Delete from "@material-ui/icons/Delete";
import Event from "@material-ui/icons/Event";
import Group from "@material-ui/icons/Group";
import Schedule from "@material-ui/icons/Schedule";
import AssessmentOutlined from "@material-ui/icons/AssessmentOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./SurveyStatus.css";
import colors from "../../config/colors";

function SurveyStatus({
  loading,
  period,
  completed,
  currentResult,
  historicResult,
}: {
  loading: boolean;
  period: string;
  completed: string;
  currentResult: number;
  historicResult: number;
}) {
  return (
    <div>
      <Paper variant="outlined" className="paper">
        {loading ? (
          <Grid container direction="row" justify="center">
            <CircularProgress
              size={24}
              style={{
                color: colors.primary,
              }}
            />
          </Grid>
        ) : (
          <>
            <h2 className="h2">Team Status</h2>
            <Grid container spacing={1} className="surveyStatusContainer">
              <Grid item xs={12}>
                <p>
                  <Event className="icon" />
                  Period:
                  <span>{period}</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <Group className="icon" />
                  Completed:
                  <span>{completed}</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <AssessmentOutlined className="icon" />
                  Current result:
                  <span>{parseFloat(currentResult.toFixed(2))}/10</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <Schedule className="icon" />
                  Historic result:
                  <span>{historicResult}/10</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      className="btn btn-contained"
                      startIcon={<Settings />}
                    >
                      Configure your team
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      className="btn btn-outlined"
                      startIcon={<Delete />}
                    >
                      Reset current survey
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </div>
  );
}

export default SurveyStatus;
