import React, { useState } from "react";
import "./TeamHomePage.css";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
import AverageChart from "../averageChart/Chart";
import Survey from "../surveyStatus/implementation";
import DetailResults from "../detailResults/DetailResults";
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
            <div className="Texto">Team Name</div>
          </Grid>
          <Grid item xs={6} md={6}>
            <AverageChart grade={18} />
          </Grid>
          <Grid item xs={6} md={6}>
            <Survey />
          </Grid>
          <Grid item xs={12}>
            <div className="Texto">Export Data Component</div>
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
