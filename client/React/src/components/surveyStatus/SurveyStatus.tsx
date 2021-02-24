import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Paper,
  Grid,
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Settings,
  Delete,
  Event,
  Timeline,
  Group,
  Schedule,
  VpnKey,
  AssessmentOutlined,
} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "./SurveyStatus.css";
import colors from "../../config/colors";
import { UserValidationService } from "../../services/Services";
import { SurveyService } from "../../services/Services";
import { IHistoric } from "../../models/interfaces";
import { ITeamDTO } from "../../models/interfaces";
import HistoricChart from "../historicAverageChart/historicAverage";

export const reRender = createContext({
  render: false,
  setRender: (valid: boolean) => {},
});
function SurveyStatus({
  loading,
  period,
  completed,
  currentResult,
  historicResult,
  teamName,
}: {
  loading: boolean;
  period: string;
  completed: string;
  currentResult: number;
  historicResult: number;
  teamName: string;
}) {
  const contextRender = useContext(reRender);
  const token = sessionStorage.getItem("token");
  const surveyService: SurveyService = new SurveyService();
  const userValidationService: UserValidationService = new UserValidationService();
  const [open, setOpen] = useState(false);
  const [surveyCode, setSurveyCode] = useState<string>("");
  const [openReset, setOpenReset] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);
  const [loadingS, setLoading] = useState(true);
  const [openChart, setOpenChart] = useState(false);
  const [historic, setHistoric] = useState<IHistoric[]>([]);
  const [body, setBody] = useState<ITeamDTO>({
    Frequency: 0,
    Name: "",
    Num_mumbers: 0,
    StartDate: "2020-06-11T00:00:00Z",
  }); // store input variables
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(""); // gets success o error message
  const [newCodeMessage, setNewCodeMessage] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false); // final dialog (shows success or error message)
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const habldeCloseChart = () => {
    setOpenChart(false);
  };

  const handleClickOpenReset = () => {
    setOpenReset(true);
  };
  const handleClickOpenGenerate = () => {
    setOpenGenerate(true);
  };

   // Function that updates the values when updated the configuration
  const handleClickCloseResetSuccess = () => {
    setSuccessDialog(false);
    setForceUpdate(!forceUpdate); // to update de surveyCode to delete
    contextRender.setRender(true); // to update de current shown values
  };

  // Function that handles the delete confirmation button clik
  const handleClickCloseReset = (reset: any) => {
    if (reset) {
      setLoadingDelete(true);
      resetCurrentSurvey(token, surveyCode);
    } else {
      setOpenReset(false);
    }
  };

  const handleClickCloseGenerateSuccess = () => {
    setNewCodeMessage(false);
    setSuccessDialog(false);
    setForceUpdate(!forceUpdate); // to update de surveyCode to delete
    contextRender.setRender(true); // to update de current shown values
  };

  const handleClickCloseGenerate = (generate: any) => {
    if (generate) {
      setLoadingGenerate(true);
      generateNewCode(token, teamName);
    } else {
      setOpenGenerate(false);
    }
  };

  //Function to format the dato eqaul to backend
  function formatDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  // When configuring your team, function to change the date
  const handleDateChange = (date: Date | null) => {
    var Fecha = formatDate(date) + "T00:00:00Z";
    setBody({
      ...body,
      StartDate: Fecha,
    });
  };

  // When configuring your team, function to change the frequency
  const handleDateChangeSprintLength = (length: any) => {
    setBody({
      ...body,
      Frequency: length,
    });
  };
  const openChartAverage = () => {
    setOpenChart(true);
  };

  // When configuring your team, function to change the number of members
  const handleDateChangeMembers = (members: any) => {
    setBody({
      ...body,
      Num_mumbers: members,
    });
  };
  const onSubmit = () => {
    setLoadingUpdate(true);
    configTeam();
    contextRender.setRender(true);
  };

  // When configuring your team, function that handles the save button click
  const configTeam = () => {
    putTeamConfig(body, teamName, token);
  };

  // When configuring your team, service to update the values
  async function putTeamConfig(
    body: ITeamDTO,
    teamName: string,
    token: string | null
  ) {
    await userValidationService
      .putTeamConfig(body, teamName, token)
      .then((res: any) => {
        setLoadingUpdate(false);
        setDeleteMessage("Team successfully updated!");
        setOpen(false);
        setSuccessDialog(true);
      })
      .catch((err: any) => {
        setLoadingUpdate(false);
        setDeleteMessage("Error updating the Team. Please try again later.");
        setOpen(false);
        setSuccessDialog(true);
      });
  }

  //Fuction to call service that retrieve team data
  async function getSurveyConfig(teamName: string, token: string | null) {
    await surveyService
      .getResultSurveyConfig(teamName, token)
      .then((res) => {
        setBody({
          Frequency: res.data.Frequency,
          Name: teamName,
          Num_mumbers: res.data.Num_mumbers,
          StartDate: res.data.StartDate,
        });
        setSurveyCode(res.data.Surveys[res.data.Surveys.length - 1].Code);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Fuction to call service that retrieve historic surveys average
  async function getHistoric(teamName: string, token: string | null) {
    await surveyService
      .getHistoricSurveys(teamName, token)
      .then((res) => {
        setHistoric(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Fuction to call service that deletes the filled survey
  async function resetCurrentSurvey(token: string | null, surveyCode: string) {
    await surveyService
      .resetSurvey(token, surveyCode)
      .then((res) => {
        setLoadingDelete(false);
        setDeleteMessage("Survey successfully reset!");
        setSuccessDialog(true);
        setOpenReset(false);
      })
      .catch((err) => {
        setLoadingDelete(false);
        setDeleteMessage("Error resetting the Survey. Please try again later.");
        setSuccessDialog(true);
        setOpenReset(false);
      });
  }

  async function generateNewCode(token: string | null, teamName: string) {
    await surveyService
    .getGenerateSurveyCode(token, teamName).then((res) => {
      setLoadingGenerate(false);
      setDeleteMessage("New code created!");
      setNewCodeMessage(true);
      setOpenGenerate(false);
      setSurveyCode(res.data.Code);
    })
    .catch((err) => {
      setLoadingGenerate(false);
      setDeleteMessage("Error creating the new survey code. Please try again later.");
      setNewCodeMessage(true);
      setOpenGenerate(false);
      console.log(err);
    });
  }

  useEffect(() => {
    getSurveyConfig(teamName, token);
    getHistoric(teamName, token);
    // eslint-disable-next-line
  }, [forceUpdate]);

  useEffect(() => {
    getHistoric(teamName, token);
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Paper variant="outlined" className="paper">
        {loading ? (
          <Grid container direction="row" justify="center">
            <CircularProgress
              size={24}
              style={{
                color: colors.primary,
              }}
            />
          </Grid>
        ) : (
          <>
            <h2 className="h2">Team Status</h2>
            <Grid container spacing={1} className="surveyStatusContainer">
              <Grid item xs={12}>
                <p>
                  <Event className="icon" />
                  Period:
                  <span>{period}</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <Group className="icon" />
                  Completed:
                  <span>{completed}</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <AssessmentOutlined className="icon" />
                  Current result:
                  <span>{parseFloat(currentResult.toFixed(2))}/10</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <Schedule className="icon" />
                  Historic result:
                  <span>{parseFloat(historicResult.toFixed(2))}/10</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <VpnKey className="icon" />
                  Survey Code:
                  <span>{surveyCode}</span>
                </p>
              </Grid>
              <Grid item xs={12}>
                {loadingS ? (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <CircularProgress
                      size={24}
                      style={{
                        color: colors.primary,
                      }}
                    />
                  </Grid>
                ) : (
                  <Grid container spacing={4} style={{ marginTop: 10 }}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        className="btn btn-contained"
                        startIcon={<Settings />}
                        onClick={handleClickOpen}
                      >
                        Configure your team
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        className="btn btn-outlined"
                        onClick={openChartAverage}
                        startIcon={
                          <Timeline
                            style={{
                              color: colors.primary,
                            }}
                          />
                        }
                      >
                        Historic Data
                      </Button>
                      <Dialog
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                        open={openChart}
                        onClose={habldeCloseChart}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="dialog-title">
                          Historic Data
                        </DialogTitle>
                        <DialogContent style={{ width: "520px" }}>
                          <DialogContentText>
                            {loadingDelete ? (
                              <Grid container direction="row" justify="center">
                                <CircularProgress
                                  size={24}
                                  style={{
                                    color: colors.primary,
                                  }}
                                />
                              </Grid>
                            ) : (
                              <HistoricChart historic={historic} />
                            )}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions
                          style={{
                            width: "53%",
                            marginBottom: "3%",
                          }}
                        >
                          <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                          >
                            <Grid item xs={12} sm={4}>
                              <Button
                                onClick={habldeCloseChart}
                                color="primary"
                                variant="contained"
                                className="btn btn-contained"
                                style={{
                                  width: "150px",
                                }}
                              >
                                Close
                              </Button>
                            </Grid>{" "}
                          </Grid>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        className="btn btn-outlined"
                        startIcon={<Delete />}
                        onClick={handleClickOpenReset}
                      >
                        Reset current survey
                      </Button>

                      <Dialog
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                        open={openReset}
                        onClose={handleClickCloseReset}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="dialog-title">
                          Are you sure?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="warnning-text">
                            {loadingDelete ? (
                              <Grid container direction="row" justify="center">
                                <CircularProgress
                                  size={24}
                                  style={{
                                    color: colors.primary,
                                  }}
                                />
                              </Grid>
                            ) : (
                              <>All current marks will be lost.</>
                            )}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions
                          style={{
                            height: "60px",
                            width: "300px",
                            margin: "15px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleClickCloseReset(true);
                            }}
                            color="primary"
                            size="large"
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => {
                              handleClickCloseReset(false);
                            }}
                            color="primary"
                            size="large"
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                        open={openGenerate}
                        onClose={handleClickCloseGenerate}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="dialog-title">
                          Are you sure?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="warnning-text">
                            {loadingGenerate ? (
                              <Grid container direction="row" justify="center">
                                <CircularProgress
                                  size={24}
                                  style={{
                                    color: colors.primary,
                                  }}
                                />
                              </Grid>
                            ) : (
                              <>Actual survey will be closed, results are available via csv export.</>
                            )}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions
                          style={{
                            height: "60px",
                            width: "300px",
                            margin: "15px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleClickCloseGenerate(true);
                            }}
                            color="primary"
                            size="large"
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => {
                              handleClickCloseGenerate(false);
                            }}
                            color="primary"
                            size="large"
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        id="update-team"
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                      >
                        {loadingUpdate && (
                          <CircularProgress
                            size={24}
                            style={{
                              color: colors.primary,
                              position: "absolute",
                              left: "46%",
                              top: "50%",
                            }}
                          />
                        )}
                        <DialogTitle id="dialog-title">
                          Configure {teamName}
                        </DialogTitle>

                        <br />
                        <DialogContent>
                          <DialogContentText id="text-dialog">
                            Sprint length(total days-p.ex: 14 for 2 weeks
                            sprint)
                          </DialogContentText>
                          <TextField
                            autoFocus
                            id="outlined-required-survey"
                            fullWidth
                            variant="outlined"
                            className={classes.root}
                            defaultValue={body.Frequency}
                            onChange={(freq) => {
                              handleDateChangeSprintLength(
                                Number(freq.target.value)
                              );
                            }}
                          />
                          <br />
                          <br />
                          <DialogContentText id="text-dialog">
                            First Sprint Start
                          </DialogContentText>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              autoOk
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              inputVariant="outlined"
                              margin="normal"
                              className={classes.root}
                              id="date-picker-inline-3"
                              value={body.StartDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <br />
                          <br />
                          <DialogContentText id="text-dialog">
                            Number of members to vote
                          </DialogContentText>
                          <TextField
                            id="outlined-required-survey-2"
                            fullWidth
                            variant="outlined"
                            className={classes.root}
                            defaultValue={body.Num_mumbers}
                            onChange={(mem) =>
                              handleDateChangeMembers(Number(mem.target.value))
                            }
                          />
                        </DialogContent>
                        <DialogActions style={{ marginBottom: 10 }}>
                          <Button
                            onClick={onSubmit}
                            color="primary"
                            size="large"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleClose}
                            size="large"
                            color="primary"
                          >
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        className="btn btn-outlined"
                        startIcon={<Settings />}
                        onClick={handleClickOpenGenerate}
                        >
                        Generate next survey
                        </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
      {successDialog && (
        <Dialog
          open={successDialog}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          onClose={handleClickCloseResetSuccess}
          BackdropProps={{
            style: { backgroundColor: colors.white, opacity: 0.7 },
          }}
          PaperProps={{
            style: {
              borderRadius: 20,
            },
          }}
        >
          <DialogContent
            style={{
              color: colors.primary,
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              width: 250,
              height: 80,
            }}
          >
            <p>{deleteMessage}</p>
          </DialogContent>
          <DialogActions
            style={{
              justifyContent: "center",
              paddingBottom: 30,
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                borderRadius: 20,
                width: 60,
              }}
              onClick={handleClickCloseResetSuccess}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {newCodeMessage && (
        <Dialog
          open={newCodeMessage}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          onClose={handleClickCloseGenerateSuccess}
          BackdropProps={{
            style: { backgroundColor: colors.white, opacity: 0.7 },
          }}
          PaperProps={{
            style: {
              borderRadius: 20,
            },
          }}
        >
          <DialogContent
            style={{
              color: colors.primary,
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              width: 250,
              height: 80,
            }}
          >
            <p>{deleteMessage}</p>
          </DialogContent>
          <DialogActions
            style={{
              justifyContent: "center",
              paddingBottom: 30,
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                borderRadius: 20,
                width: 60,
              }}
              onClick={handleClickCloseGenerateSuccess}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#919191",
        },
        "&:hover fieldset": {
          borderColor: "#919191",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#919191",
        },
      },
    },
  })
);
export default SurveyStatus;
