import React, { useContext } from "react";
import { AppBar, Toolbar, Grid, Button } from "@material-ui/core";
import { ExitToApp, Group } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import logo from "../../assets/logo_murcia.png";
import { AuthContext } from "../../context/auth";

// this component use the prop "user" to now if we are loggeg in or not
function NavBar({ user }: { user: boolean }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  //Functions that handlex the exit button
  const handleClickExit = () => {
    context.setValid(false);
    context.setMyTeams([{ Name: "" }]);
    context.setCurrentTeam("");
    context.setSurveyCode("");
    navigate("/");
  };

  return (
    <AppBar position="static" className="navBar">
      <Toolbar>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {user && (
            <Grid item xs={5} sm={9} className="navBarButtons">
              <Button
                id="exit-app-button"
                color="inherit"
                startIcon={<ExitToApp />}
                onClick={() => {
                  handleClickExit();
                }}
              >
                Sign Out
              </Button>
              {context.myTeams[0].Name !== "" && (
                <Button
                  id="my-team-button"
                  color="inherit"
                  startIcon={<Group />}
                  onClick={() => {
                    navigate("/myTeams");
                  }}
                >
                  My Teams
                </Button>
              )}
            </Grid>
          )}

          <Grid item xs={4} sm={3} md={3}>
            <img className="logoImg" src={logo} alt="Capgemini Logo" />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
