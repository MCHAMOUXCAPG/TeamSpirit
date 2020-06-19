import React, { useState } from "react";
import "./TeamHomePage.css";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
import AverageChart from "../averageChart/Chart";
import SurveyStatus from "../surveyStatus/SurveyStatus";
const TeamHomePage = () => {
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
            <div className="Texto">Team Spirit Survey</div>
          </Grid>
          <Grid item xs={6} md={6}>
            <AverageChart grade={18} />
          </Grid>
          <Grid item xs={6} md={6}>
            <SurveyStatus
              period={"25-jun 2020 to 26 jun 2020"}
              completed={"4/5"}
              currentResult={7.9}
              historicResult={7.6}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="Texto">Team Spirit Survey</div>
          </Grid>
          <Grid item xs={12}>
            <div className="Texto">Team Spirit Survey</div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TeamHomePage;
