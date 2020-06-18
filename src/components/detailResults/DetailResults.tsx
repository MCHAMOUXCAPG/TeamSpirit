import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";

import "./DetailResults.css";
import { usersResultMock, questionsResultMock } from "./mockData";

function DetailResults() {
  const [value, setValue] = useState(0);
  const [usersResult, setUsersResult] = useState(usersResultMock);
  const [questionsResult, setQuestionsResult] = useState(questionsResultMock);

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
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>RESULTS IN DETAIL</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="By User" {...a11yProps(0)} />
              <Tab label="By Question" {...a11yProps(1)} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {value === 0 && (
              <>
                {usersResult.map((userResult) => {
                  return (
                    <ExpansionPanel key={userResult.User}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
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
                                  Question {Note.number}:&nbsp;{Note.note}
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
                    <ExpansionPanel key={questionResult.QuestionNumber}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>
                          Question {questionResult.QuestionNumber}:&nbsp;
                          {questionResult.Average}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={0}>
                          {questionResult.Notes.map((Note) => {
                            return (
                              <Grid item xs={12} key={Note.User}>
                                <p>
                                  {Note.User}: {Note.note}
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
