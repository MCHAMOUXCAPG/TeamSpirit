import React, { useState } from "react";
import "./TeamHomePage.css";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
import AverageChart from "../averageChart/Chart";
const TeamHomePage = () => {
  const [sliderStep, setSliderStep] = useState<number | number[]>(5);

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
            <AverageChart grade={20} />
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="Texto">Team Spirit Survey</div>
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
