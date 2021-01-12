import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  Paper,
  Container,
  Link,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";
import Colors from "../../config/colors";
import { CodeValidationService } from "../../services/Services";
import { IValidationCode } from "../../models/interfaces";
import { AuthContext } from "../../context/auth";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const navigate = useNavigate();
  const codeValidationService: CodeValidationService = new CodeValidationService();

  // Function to make public route
  useEffect(() => {
    context.setValid(false);
    // eslint-disable-next-line
  }, []);

  // Get the uniqueId from localStorage, if not exists, create a new one
  let uniqueId: any = undefined;
  if (localStorage.getItem("uniqueIdTS")) {
    uniqueId = localStorage.getItem("uniqueIdTS");
  } else {
    uniqueId = uuidv4();
    localStorage.setItem("uniqueIdTS", uniqueId);
  }

  // Function to validate the input code
  const submitHandler = (event: any) => {
    event.preventDefault();
    setLoading(true);
    sendCode({ code: search, User: uniqueId });
  };

  // Fnction to valide the user input
  async function sendCode(inputText: IValidationCode) {
    await codeValidationService
      .sendCode(inputText)
      .then((res) => {
        context.setValid(true);
        context.setSurveyCode(res.data.Code);
        context.setCurrentTeam(res.data.TeamName);
        navigate("/survey");
        // if valid, you have access to survey
      })
      .catch((err) => {
        setErr(true);
        if (err.request.status === 0) {
          setHelperTxt(
            "Network Error! Please verify you have internet access."
          );
        } else {
          setHelperTxt(err.response.data.Message);
        }
        setLoading(false);
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
              <Paper
                id="Card"
                variant="elevation"
                elevation={3}
                style={{ height: 160 }}
              >
                <form onSubmit={submitHandler}>
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
                          placeholder="Enter your code in capital letters..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          helperText={HelperTxt}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    disabled={loading}
                    id="ButtonStart"
                    type="submit"
                    size="small"
                    style={{
                      bottom: Err ? 15 : -12,
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        style={{
                          color: "#fff",
                        }}
                      />
                    ) : (
                      "Start"
                    )}
                  </Button>
                </form>
                <Link
                  component="button"
                  style={
                    Err
                      ? { color: Colors.primary, width: "100%" }
                      : {
                          color: Colors.primary,
                          marginTop: 25,
                          width: "100%",
                        }
                  }
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  Are you a Team Leader?
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

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
