import React, { useState } from "react";
import "./HomePage.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Paper, Container } from "@material-ui/core";
import {
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { CodeValidationService } from "../../services/Services";
import { IValidationCode } from "../../models/interfaces";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [search, setSearch] = useState("");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const navigate = useNavigate();
  const codeValidationService: CodeValidationService = new CodeValidationService();

  const submitHandler = () => {
    console.log("dentro de submit");
    sendCode({ code: search });
  };

  async function sendCode(inputText: IValidationCode) {
    await codeValidationService
      .sendCode(inputText)
      .then((res) => {
        console.log("dentro de res: " + res.data.TeamName);
        navigate("/survey");
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setHelperTxt("Incorrect entry.");

        //      setErr(true);
        //      if (err.request.status == 0) {
        //        setHelperTxt("Network Error!");
        //      } else {
        //        setHelperTxt("Incorrect entry.");
        //      }
      });
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        // "& label.Mui-focused": {
        //   color: "#ffff",
        // },
        // "& .MuiInput-underline:after": {
        //   borderBottomColor: "#ffff",
        // },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ffff",
          },
          "&:hover fieldset": {
            borderColor: "#ffff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffff",
          },
        },
      },
    })
  );
  const classes = useStyles();
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
              <div className="headerSurvey">
                Welcome to <br /> Team Spirit Survey
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={1} lg={1}></Grid>
            <Grid item xs={12} id="espacioTitle-Input"></Grid>
            <Grid item xs={2} sm={6} md={6} lg={6}></Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <form noValidate autoComplete="off">
                <Paper id="Card" variant="elevation" elevation={3}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid item xs={12} id="espacioCard-Input"></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <TextField
                          required
                          error={Err}
                          className={classes.root}
                          id="outlined-required"
                          variant="outlined"
                          placeholder="Enter your code in captial letters..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          helperText={HelperTxt}
                        />
                      </Grid>
                      <Grid item xs={3}></Grid>
                    </Grid>
                  </Grid>
                  <Button
                    id="ButtonStart"
                    // type="submit"
                    onClick={submitHandler}
                    size="small"
                  >
                    Start
                  </Button>
                </Paper>
              </form>
            </Grid>
            <Grid item xs={5} sm={1} md={1} lg={1}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
