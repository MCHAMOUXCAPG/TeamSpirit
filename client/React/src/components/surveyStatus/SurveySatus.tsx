import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Settings from "@material-ui/icons/Settings";
import Delete from "@material-ui/icons/Delete";
import Event from "@material-ui/icons/Event";
import Group from "@material-ui/icons/Group";
import Schedule from "@material-ui/icons/Schedule";
import AssessmentOutlined from "@material-ui/icons/AssessmentOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./SurveyStatus.css";
import colors from "../../config/colors";
import { UserValidationService } from "../../services/Services";
import { SurveyService } from "../../services/Services";
import { ITeamDTO } from "../../models/interfaces";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
  const [loadingS, setLoading] = useState(true);
  const [body, setBody] = useState<ITeamDTO>({
    Frequency: 0,
    Name: "",
    Num_mumbers: 0,
    StartDate: "2020-06-11T00:00:00Z",
  }); // store input variables
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(""); // gets success o error message
  const [successDialog, setSuccessDialog] = useState(false); // final dialog (shows success or error message)
  const [forceUpdate, setForceUpdate] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenReset = () => {
    setOpenReset(true);
  };
  const handleClickCloseResetSuccess = () => {
    setSuccessDialog(false);
    setForceUpdate(!forceUpdate); // to update de surveyCode to delete
    contextRender.setRender(true); // to update de current shown values
  };
  const handleClickCloseReset = (borrar: any) => {
    if (borrar) {
      setLoadingDelete(true);
      deleteSurvey(token, surveyCode);
    } else {
      setOpenReset(false);
    }
  };
  function formatDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  const handleDateChange = (date: Date | null) => {
    var Fecha = formatDate(date) + "T00:00:00Z";
    setBody({
      ...body,
      StartDate: Fecha,
    });
  };
  const handleDateChangeSprintLength = (length: any) => {
    setBody({
      ...body,
      Frequency: length,
    });
  };
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
  const configTeam = () => {
    putTeamConfig(body, teamName, token);
  };
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
  async function deleteSurvey(token: string | null, surveyCode: string) {
    await surveyService
      .deleteSurvey(token, surveyCode)
      .then((res) => {
        setLoadingDelete(false);
        setDeleteMessage("Survey successfully deleted!");
        setSuccessDialog(true);
        setOpenReset(false);
      })
      .catch((err) => {
        setLoadingDelete(false);
        setDeleteMessage("Error deleting the Survey. Please try again later.");
        setSuccessDialog(true);
        setOpenReset(false);
      });
  }
  useEffect(() => {
    getSurveyConfig(teamName, token);
    // eslint-disable-next-line
  }, [forceUpdate]);
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
                              <>The actual result will be lost</>
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
