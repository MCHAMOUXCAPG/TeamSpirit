import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { VpnKey } from "@material-ui/icons";
import Person from "@material-ui/icons/Person";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import "./LoginPage.css";
import colors from "../../config/colors";
import { UserValidationService } from "../../services/Services";
import { IValidationUser } from "../../models/interfaces";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const navigate = useNavigate();
  const userValidationService: UserValidationService = new UserValidationService();

  useEffect(() => {
    context.setValid(false);
    // eslint-disable-next-line
  }, []);
  // to make private route

  const submitHandler = () => {
    setLoading(true);
    const params = {
      Email: userValue,
      Password: passwordValue,
    }; // Save the inputs in constants
    sendUser(params);
    // Call the service
  };

  // User Validation service
  async function sendUser(body: IValidationUser) {
    await userValidationService
      .sendUser(body)
      .then((res: any) => {
        context.setValid(true);
        sessionStorage.setItem("token", res.data.token);
        userValidationService
          .getUser(res.data.token)
          .then((res2: any) => {
            console.log(res2.data);
            const teams = res2.data.Teams;
            const role: number = res2.data.Role.Id;
            if (role === 1) {
              navigate("/admin");
            } else if (role === 1) {
              if (teams.length === 0) {
                navigate("/noTeam");
                //if no team, message requesting team
              } else if (teams.length === 2) {
                context.setCurrentTeam(res2.data.Teams[0].Name);
                navigate("/teamleader");
                //if one team go to see the results
              } else {
                context.setMyTeams(res2.data.Teams);
                navigate("/myTeams");
                // if more than 1 teams, go to coose your team
              }
            }
          })
          .catch((err: any) => {
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
        // If user valid, save the token and go to teamHomePage
      })
      .catch((err: any) => {
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
              <form noValidate autoComplete="off">
                <Paper
                  id="Card"
                  variant="elevation"
                  elevation={3}
                  style={{ height: 180 }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid
                        item
                        xs={12}
                        style={{ margin: "15px 15px 5px 15px" }}
                      >
                        <TextField
                          required
                          error={Err}
                          className={classes.root}
                          id="outlined-required"
                          variant="outlined"
                          placeholder="Username"
                          value={userValue}
                          onChange={(e) => setUserValue(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} style={{ margin: "5px 15px" }}>
                        <TextField
                          required
                          error={Err}
                          className={classes.root}
                          id="outlined-required-2"
                          variant="outlined"
                          placeholder="Password"
                          type="password"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          helperText={HelperTxt}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKey style={{ color: colors.primary }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    disabled={loading}
                    id="ButtonStart"
                    onClick={submitHandler}
                    size="small"
                    style={{
                      bottom: Err ? -1 : -12,
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
                      "Sign In"
                    )}
                  </Button>
                </Paper>
              </form>
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
        backgroundColor: "#fff",
        width: 250,

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

export default LoginPage;
