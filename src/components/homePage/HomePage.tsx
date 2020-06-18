import React, { useState, useContext } from "react";
import "./HomePage.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Paper, Container } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CodeValidationService } from "../../services/Services";
import { IValidationCode } from "../../models/interfaces";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

function HomePage() {
  const context = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const navigate = useNavigate();
  const codeValidationService: CodeValidationService = new CodeValidationService();

  const submitHandler = () => {
    sendCode({ code: search });
  };

  async function sendCode(inputText: IValidationCode) {
    await codeValidationService
      .sendCode(inputText)
      .then((res) => {
        context.setValid(true);
        navigate("/teamleader");
      })
      .catch((err) => {
        setErr(true);
        if (err.request.status === 0) {
          setHelperTxt(
            "Network Error! Please verify you have internet access."
          );
        } else {
          setHelperTxt(err.response.data.message);
        }
      });
  }

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
        <Grid item xs={12} id="content">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item xs={12} id="header">
              <div className="headerSurvey">
                Welcome to
                <br />
                Team Spirit Survey
              </div>
            </Grid>
            <Grid item xs={12}>
              <form noValidate autoComplete="off">
                <Paper id="Card" variant="elevation" elevation={3}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid item xs={12} style={{ margin: 15 }}>
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
                    </Grid>
                  </Grid>
                  <Button
                    id="ButtonStart"
                    onClick={submitHandler}
                    size="small"
                    style={{ bottom: Err ? 15 : -12 }}
                  >
                    Start
                  </Button>
                </Paper>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

export default HomePage;
