import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import "./NavBar.css";
import logo from "../../assets/logo.png";

function NavBar() {
  return (
    <AppBar position="static" className="navBar">
      <Toolbar>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item xs={4} sm={3} md={3}>
            <img className="logoImg" src={logo} alt="Capgemini Logo" />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
