import React from "react";
import "./HomePage.css";
import Background from "../../assets/homePageBackground.png";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

function HomePage() {
  var sectionStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${Background})`,
  };
  return (
    <div id="bgImg" style={sectionStyle}>
      <div className="headerSurvey">Welcome to <br/> Team Spirit Survey</div>
      <form noValidate autoComplete="off">
        <Card id="Card">
          <CardContent>
            <TextField
              required
              id="standard-required"
              variant="outlined"
              placeholder="Enter your code in captial letters..."
            />
          </CardContent>
          <CardActions>
            <Button id ="ButtonStart"onClick={() => { alert('clicked') }} size="small">Start</Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default HomePage;
