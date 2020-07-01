import React, { useContext } from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import NavBar from "../navBar/NavBar";
import AverageChart from "../averageChart/Chart";
import "./myTeamPage.css";
const MyTeamsPage = () => {
  const context = useContext(AuthContext);
  function handleClick(props: any) {
    alert("Team Name clicked " + props);
  }
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
            <div className="team-name">My Teams</div>
          </Grid>

          <Grid container spacing={3}>
            {context.myTeams.map((team) => {
              return (
                <Grid item xs={4}>
                  <Paper
                    className="paper-card"
                    elevation={4}
                    style={{
                      padding: 20,
                      boxShadow: "2px 3px 3px 3px #79C0C6",
                      borderRadius: 20,
                    }}
                    onClick={() => {
                      handleClick(team.Name);
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={12} className="team">
                        {team.Name}
                      </Grid>
                      <Grid item xs={12} justify="flex-start">
                        <AverageChart loading={false} grade={6.06} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyTeamsPage;
