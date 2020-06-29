import React, { useState, useContext } from "react";
import {
  Grid,
  Paper,
  Container,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  Input,
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

  const submitHandler = () => {
    setLoading(true);

    const params = {
      Email: userValue,
      Password: passwordValue,
    };

    console.log(params);
    sendUser(params);
  };

  async function sendUser(body: IValidationUser) {
    await userValidationService
      .sendUser(body)
      .then((res) => {
        context.setValid(true);
        sessionStorage.setItem("token", res.data.token);
        navigate("");
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
                          helperText={HelperTxt}
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
                          id="outlined-required"
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
                      bottom: Err ? -12 : -12,
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
