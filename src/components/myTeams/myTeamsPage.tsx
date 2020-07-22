import React, { useContext } from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import NavBar from "../navBar/NavBar";
import "./myTeamPage.css";
import MyTeamChart from "../myTeamChart/myTeamChart";
import colors from "../../config/colors";
const MyTeamsPage = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [allowClick, setAllowClick] = React.useState(true);
  function handleClick(teamName: string) {
    context.setCurrentTeam(teamName);
    navigate("/teamleader");
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

          <Grid container spacing={8}>
            {context.myTeams.map((team) => {
              return (
                <Grid key={team.Name} item xs={12} md={6}>
                  <Paper
                    className="paper-card"
                    elevation={4}
                    style={{
                      padding: 20,
                      boxShadow: "2px 3px 3px 3px " + colors.primary,
                      borderRadius: 20,
                    }}
                    onClick={() => {
                      if (allowClick) {
                        handleClick(team.Name);
                      }
                    }}
                  >
                    <MyTeamChart
                      teamName={team.Name}
                      setAllowClick={setAllowClick}
                    />
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
