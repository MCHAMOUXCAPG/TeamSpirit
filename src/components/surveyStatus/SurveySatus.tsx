import React, { useState, useEffect } from "react";
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
import { ITeamDTO, IOneTeamDTO } from "../../models/interfaces";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
  const token = sessionStorage.getItem("token");
  const surveyService: SurveyService = new SurveyService();
  const userValidationService: UserValidationService = new UserValidationService();
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [auxDate, setAuxDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const [sprintLength, setSpringLength] = React.useState<number>(0);
  const [members_num, setMembers_num] = React.useState<number>(0);
  const [loadingS, setLoading] = useState(true);
  const [currentTeamConfig, setCurrentTeamConfig] = useState<IOneTeamDTO>({
    Frequency: 0,
    Name: "", //TeamName
    Num_mumbers: 0,
    StartDate: "",
    surveys: [
      {
        code: "",
        endDate: "",
        notes: [
          {
            Number: 0,
            SurveyCode: "",
            User: "",
            note: 0,
          },
        ],
        startDate: "",
        teamName: "",
      },
    ],
    users: [
      {
        email: "",
        full_name: "",
        id: 0,
        password: "",
        roles: [
          {
            id: 0,
            name: "",
            userID: 0,
          },
        ],
        teams: [],
      },
    ],
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (guardar: any) => {
    setOpen(false);

    if (guardar) {
      setCurrentTeamConfig({
        ...currentTeamConfig,
        Frequency: sprintLength,
        Num_mumbers: members_num,
        StartDate: selectedDate
          ? selectedDate.toString()
          : currentTeamConfig.StartDate,
      });
      putTeamConfig(
        {
          frequency: currentTeamConfig.Frequency,
          name: currentTeamConfig.Name,
          num_munbers: currentTeamConfig.Num_mumbers,
          startDate: currentTeamConfig.StartDate,
        },
        teamName,
        token
      );
      setAuxDate(selectedDate);
    } else {
      setAuxDate(selectedDate);
      setSelectedDate(auxDate);
    }
  };
  const handleClickOpenReset = () => {
    setOpenReset(true);
  };
  const handleClickCloseReset = (borrar: any) => {
    setOpenReset(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleDateChangeSprintLength = (length: any) => {
    setSpringLength(length);
  };
  const handleDateChangeMembers = (members: any) => {
    setMembers_num(members);
  };

  async function putTeamConfig(
    body: ITeamDTO,
    teamName: string,
    token: string | null
  ) {
    await userValidationService
      .putTeamConfig(body, teamName, token)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  async function getSurveyConfig(teamName: string, token: string | null) {
    await surveyService
      .getResultSurveyConfig(teamName, token)
      .then((res) => {
        setCurrentTeamConfig(res.data);
        setSpringLength(res.data.Frequency);
        setMembers_num(res.data.Num_mumbers);
        var fecha = new Date(res.data.StartDate);
        setSelectedDate(fecha);
        setAuxDate(fecha);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getSurveyConfig(teamName, token);
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
                        open={openReset}
                        onClose={handleClickCloseReset}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="dialog-title">
                          Are you sure?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="warnning-text">
                            The actual result will be lost
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
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                      >
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
                            defaultValue={currentTeamConfig.Frequency}
                            onChange={(freq) => {
                              handleDateChangeSprintLength(freq.target.value);
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
                              id="date-picker-inline"
                              value={selectedDate}
                              onChange={(date) => handleDateChange(date)}
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
                            id="outlined-required-survey"
                            fullWidth
                            variant="outlined"
                            className={classes.root}
                            defaultValue={currentTeamConfig.Num_mumbers}
                            onChange={(mem) =>
                              handleDateChangeMembers(mem.target.value)
                            }
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleClose(true);
                            }}
                            color="primary"
                            size="large"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose(false);
                            }}
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
