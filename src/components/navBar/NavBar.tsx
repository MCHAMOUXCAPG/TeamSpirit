import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Group from "@material-ui/icons/Group";

import "./NavBar.css";
import logo from "../../assets/logo.png";

function NavBar({ user }: { user: boolean }) {
  return (
    <AppBar position="static" className="navBar">
      <Toolbar>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {user ? (
            <Grid item xs={5} sm={9} className="navBarButtons">
              <Button color="inherit" startIcon={<ExitToApp />}>
                Sign Out
              </Button>
              <Button color="inherit" startIcon={<Group />}>
                My Teams
              </Button>
            </Grid>
          ) : null}

          <Grid item xs={4} sm={3} md={3}>
            <img className="logoImg" src={logo} alt="Capgemini Logo" />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
