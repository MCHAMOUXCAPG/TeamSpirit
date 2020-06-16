import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Grid, Container } from "@material-ui/core";

import "./ExitPage.css";

function ExitPage() {
  return (
    <Container id="bgImg" disableGutters={true}>
      <Grid
        container
        justify="center"
        alignItems="flex-end"
        direction="column"
        wrap="nowrap"
        spacing={0}
        id="GridContainer"
      >
        <Grid item>
          <Grid container spacing={0}>
            <Grid item xs={12} id="espacioHeader"></Grid>
            <Grid item xs={2} sm={1} md={3} lg={1}></Grid>
            <Grid item xs={8} sm={10} md={8} lg={10} id="header">
              <div className="headerSurvey">Team Spirit Survey</div>
            </Grid>
            <Grid item xs={2} sm={2} md={1} lg={1}></Grid>
            <Grid item xs={12} id="espacioTitle-Input"></Grid>
            <Grid item xs={2} sm={6} md={6} lg={6}></Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <div className="sentence">Your opinion counts!</div>
            </Grid>
            <Grid item xs={5} sm={1} md={1} lg={1}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExitPage;
