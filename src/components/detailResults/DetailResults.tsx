import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./DetailResults.css";
import { usersResultMock, questionsResultMock } from "./mockData";
import LoupeIcon from "@material-ui/icons/Loupe";
import { Grid, Container } from "@material-ui/core";
function DetailResults() {
  const [value, setValue] = useState(0);
  const [usersResult, setUsersResult] = useState(usersResultMock);
  const [questionsResult, setQuestionsResult] = useState(questionsResultMock);
  const puntos =
    "...................................................................................................................................................................................................................................................................................";
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: any) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  return (
    <ExpansionPanel id="mainPanel">
      <ExpansionPanelSummary
        // expandIcon={<AddCircleIcon color="primary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Container>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={6} style={{ position: "relative", left: "47%" }}>
              <InputAdornment id="Header" position="start">
                <LoupeIcon />
              </InputAdornment>
            </Grid>
            <Grid item xs={6}>
              <Typography id="Header">RESULTS IN DETAIL</Typography>
            </Grid>
          </Grid>
        </Container>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="By User" {...a11yProps(0)} id="user-tab" />
              <Tab label="By Question" {...a11yProps(1)} id="question-tab" />
            </Tabs>
          </Grid>
          <Grid item xs={12} id="inner-grid">
            {value === 0 && (
              <>
                {usersResult.map((userResult) => {
                  return (
                    <ExpansionPanel
                      key={userResult.User}
                      id="second-panel"
                      style={{ margin: "20px 20px" }}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon color="secondary" />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>
                          {userResult.User}: {userResult.Average}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={0}>
                          {userResult.Notes.map((Note) => {
                            return (
                              <Grid item xs={12} key={Note.number}>
                                <p>
                                  Question {Note.number}:&nbsp;{puntos}
                                  {Note.note}
                                </p>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
              </>
            )}
            {value === 1 && (
              <>
                {questionsResult.map((questionResult) => {
                  return (
                    <ExpansionPanel
                      key={questionResult.QuestionNumber}
                      id="second-panel"
                      style={{ margin: "20px 20px" }}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon color="secondary" />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>
                          Question {questionResult.QuestionNumber}:&nbsp;
                          {questionResult.Average}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails id="results-details">
                        <Grid container spacing={0}>
                          {questionResult.Notes.map((Note) => {
                            return (
                              <Grid item xs={12} key={Note.User}>
                                <p>
                                  {Note.User}:{puntos} {Note.note}
                                </p>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
              </>
            )}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default DetailResults;
