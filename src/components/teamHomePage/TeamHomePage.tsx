import React, { useState } from "react";
import "./Survey.css";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
const Survey = () => {
  const [sliderStep, setSliderStep] = useState<number | number[]>(5);

  return (
    <Container maxWidth="lg" className="content" disableGutters={true}>
      <NavBar user={true}></NavBar>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
        >
          <div className="Texto">Team Spirit Survey</div>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
        >
          <div className="Texto">Team Spirit Survey</div>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
        >
          <div className="Texto">Team Spirit Survey</div>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
        >
          <div className="Texto">Team Spirit Survey</div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Survey;
