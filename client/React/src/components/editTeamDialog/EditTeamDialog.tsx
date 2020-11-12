import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ITeamDTO, ITeam } from "../../models/interfaces";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ManageTeamService } from "../../services/Services";
import "./EditTeamDialog.css";

const EditTeamDialog = ({
  currentTeam,
  open,
  handleClose,
  setLoading,
  setMessage,
  setOpenMessage,
}: {
  currentTeam: ITeam | undefined;
  open: boolean;
  handleClose: (bool: boolean) => void;
  setLoading: any;
  setMessage: any;
  setOpenMessage: any;
}) => {
  const token = sessionStorage.getItem("token");
  const [body, setBody] = useState<ITeamDTO>({
    Name: "",
    Frequency: 0,
    StartDate: "2020-06-11T00:00:00Z",
    Num_mumbers: 0,
  });

  const [Err, setErr] = useState(false);
  const [HelperNum, setHelperNum] = useState("");
  const [HelperNumB, setHelperNumB] = useState("");

    // Function to validate the frequency.
    function onlyNumber(index: number, inputtxt: string) {
      var number = /\b([1-9]|[1-9][0-9])\b/;
      if (inputtxt.match(number)) {
        setErr(false);
        setHelperNum("");
        setDisabledSubmit(false);
      } else {
        setErr(true);
        setHelperNum("Please input valid numbers only!");
        setDisabledSubmit(true);
      }
    }

    // Function to validate the members number
    function onlyNumberB(index: number, inputtxt: string) {
      var number = /\b([1-9]|[1-9][0-9])\b/;
      if (inputtxt.match(number)) {
        setErr(false);
        setHelperNumB("");
        setDisabledSubmit(false);
      } else {
        setErr(true);
        setHelperNumB("Please input valid numbers only!");
        setDisabledSubmit(true);
      }
    }


    // When configuring your team, function to change the date
    const handleDateChange = (date: Date | null) => {
      var Fecha = formatDate(date) + "T00:00:00Z";
      setBody({
        ...body,
        StartDate: Fecha,
      });
      setDisabledSubmit(false);
    };

     //Function to format the date equal to backend
  function formatDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const manageService: ManageTeamService = new ManageTeamService();

  // Function that updates the user and saves the user to the database with the new changes.
  async function updateTeam(body: ITeamDTO, teamName: string, token: string | null) {
    await manageService
      .updateTeam(body, teamName, token)
      .then((res: any) => {
        setBody({
          Name: "",
          Frequency: 0,
          StartDate: "2020-06-11T00:00:00Z",
          Num_mumbers: 0,
        });
        setMessage("Team succesfully updated.");
        setLoading(false);
        setOpenMessage(true);
        setDisabledSubmit(false);
      })
      .catch((err) => {
        setBody({
          Name: "",
          Frequency: 0,
          StartDate: "2020-06-11T00:00:00Z",
          Num_mumbers: 0,
        });
        setMessage("Something went wrong. Try again later.");
        setLoading(false);
        setOpenMessage(true);
        setDisabledSubmit(false);
      });
  }

  const [name, setName] = useState<string | undefined>("");
  const [frequency, setFrequency] = useState<number | undefined>(0);
  const [startDate, setStartDate] = useState<string | undefined>("2020-06-11T00:00:00Z");
  const [members, setMembers] = useState<number | undefined>(0);;

  // Function that loads the information of the user we want to edit.
  useEffect(() => {
    if (currentTeam) {
      setName(currentTeam?.Name);
      setFrequency(currentTeam?.Frequency);
      setStartDate(currentTeam?.StartDate);
      setMembers(currentTeam?.Num_mumbers);
      setBody(currentTeam);
    }
    // eslint-disable-next-line
  }, [open]);

  const classes = useStyles();
  const handleSubmit = () => {
    setLoading(true);
    handleClose(!open);
    updateTeam(body, body.Name, token);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose(!open);
        setBody({
          Name: "",
          Frequency: 0,
          StartDate: "",
          Num_mumbers:0
        });
      }}
      aria-labelledby="form-dialog-title"
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitle id="dialog-title">Edit this Team</DialogTitle>
      <DialogContent>
        <DialogContentText id="text-dialog">
          Duration of survey in days
        </DialogContentText>
        <TextField
          required
          placeholder="Frequency"
          id="input-num-2"
          fullWidth
          variant="outlined"
          error={Err}
          helperText={HelperNum}
          className={classes.root}
          value={frequency}
          onChange={(freq) => {
            setFrequency(Number(freq.target.value));
            setBody({ ...body, Frequency: Number(freq.target.value) });
          }}
          onBlur={() => {
            onlyNumber(1, String(body.Frequency));
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
            value={startDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <DialogContentText id="text-dialog">
          Number of person to vote
        </DialogContentText>
        <TextField
          required
          placeholder="Members"
          id="input-num-3"
          fullWidth
          variant="outlined"
          error={Err}
          helperText={HelperNumB}
          className={classes.root}
          value={members}
          onChange={(mem) => {
            setMembers(Number(mem.target.value));
            setBody({ ...body, Num_mumbers: Number(mem.target.value) });
          }}
          onBlur={() => {
            onlyNumberB(3, String(body.Num_mumbers));
          }}
        />
        <br />
      
      </DialogContent>
      <DialogActions style={{ marginBottom: 10 }}>
        <Button
          onClick={handleSubmit}
          color="primary"
          size="large"
          id="save-btn"
          disabled={disabledSubmit}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            handleClose(!open);
          }}
          size="large"
          color="primary"
          id="cancel-btn"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
export default EditTeamDialog;
