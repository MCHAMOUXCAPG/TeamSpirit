import React from "react";
import { Container, Grid } from "@material-ui/core";

import NavBar from "../navBar/NavBar";
import "./NoTeamPage.css";

const NoTeamPage = () => {
  return (
    <>
      <NavBar user={true} />
      <Container maxWidth="lg" className="content" disableGutters={true}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
        >
          <Grid item xs={12}>
            <div className="team-name">Error</div>
          </Grid>

          <Grid item xs={12}>
            <p className="error-message">
              Please contact with the Team Spirit Administrator, you don't have
              any team assigned yet
            </p>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NoTeamPage;
