import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { IResultsByUsers, IResultsByQuestions } from "../../models/interfaces";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LoupeIcon from "@material-ui/icons/Loupe";
import colors from "../../config/colors";
import questions from '../../models/questions';
import "./DetailResults.css";

function DetailResults({
  usersResult,
  questionsResult,
  noData,
  completed,
}: {
  usersResult: IResultsByUsers[] | undefined;
  questionsResult: IResultsByQuestions[] | undefined;
  noData: boolean;
  completed: string;
}) {
  const [value, setValue] = useState(0);
  const puntos =
    "............................................................................................................................................................  ";
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Function that helps differentiate the id between the tabs.
  function a11yProps(index: any) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  return (
    <ExpansionPanel id="mainPanel">
      <ExpansionPanelSummary
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
            <Grid item xs={12}>
              <Typography id="Header">
                <LoupeIcon className="loupe-icon" />
                RESULTS IN DETAIL
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ExpansionPanelSummary>
      {noData || Number(completed.substring(0, 1)) <= 0 ? (
        <Grid container direction="row" justify="center">
          <Grid item xs={12}>
            <p className="error-message">No data to display</p>
          </Grid>
        </Grid>
      ) : (
        <ExpansionPanelDetails>
          {usersResult && questionsResult ? (
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="By User" {...a11yProps(0)} id="user-tab" />
                  <Tab
                    label="By Question"
                    {...a11yProps(1)}
                    id="question-tab"
                  />
                </Tabs>
              </Grid>
              <Grid item xs={12} id="inner-grid">
                {value === 0 && (
                  <>
                    {usersResult.map((userResult, index) => {
                      return (
                        <ExpansionPanel
                          key={index}
                          id="second-panel"
                          style={{ margin: "20px 20px" }}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon color="secondary" />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>
                              {userResult.User}:&nbsp;
                              {parseFloat(userResult.Average.toFixed(2))}
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={0}>
                              {userResult.Notes.map((Note, index) => {
                                return (
                                  <Grid item xs={12} key={index}>
                                   <Box display="flex" p={1} >
                                    <Box p={1} flexGrow={1} >
                                    <p>{ questions[index].question}</p>
                                    </Box>
                                    <Box p={1}>
                                    <p>{parseFloat(Note.Note.toFixed(2))}</p>
                                    </Box>
                                  </Box>
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
                    {questionsResult.map((questionResult, index) => {
                      return (
                        <ExpansionPanel
                          key={index}
                          id="second-panel"
                          style={{ margin: "20px 20px" }}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon color="secondary" />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>


                              { questions[index].question}&nbsp;
                              {parseFloat(questionResult.Average.toFixed(2))}
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails id="results-details">
                            <Grid container spacing={0}>
                              {questionResult.Notes.map((Note, index) => {
                                return (
                                  <Grid item xs={12} key={index}>
                                   <Box display="flex" p={1} >
                                    <Box p={1} flexGrow={1} >
                                    <p>User&nbsp;{index + 1}</p>
                                    </Box>
                                    <Box p={1}>
                                    <p>{parseFloat(Note.Note.toFixed(2))}</p>
                                    </Box>
                                  </Box>
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
          ) : (
            <Grid container direction="row" justify="center">
              <CircularProgress
                size={24}
                style={{
                  color: colors.primary,
                }}
              />
            </Grid>
          )}
        </ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
}

export default DetailResults;
