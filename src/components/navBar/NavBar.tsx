import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Group from "@material-ui/icons/Group";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/auth";

function NavBar({ user }: { user: boolean }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

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
