import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ITeamDTO } from "../../models/interfaces";
import { ManageTeamService } from "../../services/Services";
import DateFnsUtils from "@date-io/date-fns";
import "./CreateTeamDialog.css";

const CreateTeamDialog = ({
  open,
  handleClose,
  setLoading,
  setMessage,
  setOpenMessage,
}: {
  open: boolean;
  handleClose: (bool: boolean) => void;
  setLoading: any;
  setMessage: any;
  setOpenMessage: any;
}) => {
  const token = sessionStorage.getItem("token");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const [HelperNum, setHelperNum] = useState("");
  const [HelperNumB, setHelperNumB] = useState("");
  const [validateSubmit, setValidateSubmit] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  // Function to enable "Save" button when user has finished filling in the form.
  const updateValidateSubmit = (index: number, value: boolean) => {
    const newValidateSubmit = validateSubmit;
    newValidateSubmit[index] = value;
    setValidateSubmit(newValidateSubmit);
    let count = 0;
    newValidateSubmit.forEach((valid) => {
      if (valid) {
        count++;
      }
    });
    if (count === 4) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  };

  // Function to validate that the full name of the user will only contain alphabet characters.
  function allLetter(inputtxt: string) {
    var letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    if (inputtxt.match(letters)) {
      setErr(false);
      setHelperTxt("");
      updateValidateSubmit(0, true);
    } else {
      setErr(true);
      setHelperTxt("Please input alphabet characters only!");
      updateValidateSubmit(0, false);
    }
  }

    // Function to validate the frequency.
    function onlyNumber(index: number, inputtxt: string) {
      var number = /\b([1-9]|[1-9][0-9])\b/;
      if (inputtxt.match(number)) {
        setErr(false);
        setHelperNum("");
        updateValidateSubmit(index, true);
      } else {
        setErr(true);
        setHelperNum("Please input valid numbers only!");
        updateValidateSubmit(index, false);
      }
    }

    // Function to validate the members number
    function onlyNumberB(index: number, inputtxt: string) {
      var number = /\b([1-9]|[1-9][0-9])\b/;
      if (inputtxt.match(number)) {
        setErr(false);
        setHelperNumB("");
        updateValidateSubmit(index, true);
      } else {
        setErr(true);
        setHelperNumB("Please input valid numbers only!");
        updateValidateSubmit(index, false);
      }
    }

  const [body, setBody] = useState<ITeamDTO>({
    Frequency: 0,
    Name: "",
    Num_mumbers: 0,
    StartDate: "",
  });

  const manageService: ManageTeamService = new ManageTeamService();

  // When configuring your team, function to change the frequency
  const handleDateChangeSprintLength = (length: any) => {
    setBody({
      ...body,
      Frequency: length,
    });
  };

  // Function to empty form in case the user saves or cancels the form submission.
  const resetValues = () => {
    setBody({
      Frequency: 0,
      Name: "",
      Num_mumbers: 0,
      StartDate: "",
    });
    setValidateSubmit([false, false, false, false]);
    setDisabledSubmit(true);
    setErr(false);
  };

  const handleDateChange = (date: Date | null) => {
    var Fecha = formatDate(date) + "T00:00:00Z";
    setBody({
      ...body,
      StartDate: Fecha,
    });
    updateValidateSubmit(2, true);
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

  // When configuring your team, function to change the number of members
  const handleDateChangeMembers = (members: any) => {
    setBody({
      ...body,
      Num_mumbers: members,
    });
  };

  // Function that creates a team storing it in the database.
  async function createTeam(body: ITeamDTO, token: string | null) {
    await manageService
      .createTeam(body, token)
      .then((res: any) => {
        resetValues();
        setMessage("Team succesfully created.");
        setLoading(false);
        setOpenMessage(true);
      })
      .catch((err) => {
        resetValues();
        setMessage("Something went wrong. Try again later.");
        setLoading(false);
        setOpenMessage(true);
      });
  }

   const classes = useStyles();
  const handleSubmit = () => {
    setLoading(true);
    handleClose(!open);
    createTeam(body, token);
  };

  return (
    <form>
      <Dialog
        open={open}
        onClose={() => {
          handleClose(!open);
          setBody({
            Frequency: 0,
            Name: "",
            Num_mumbers: 0,
            StartDate: "",
          });
        }}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="dialog-title">
          Fill this form to create a Team
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="text-dialog">
          Name of the Team
        </DialogContentText>
        <TextField
          required
          placeholder="Name"
          id="input-num-1"
          fullWidth
          variant="outlined"
          error={Err}
          helperText={HelperTxt}
          className={classes.root}
          onChange={(name) => {
            setBody({ ...body, Name: name.target.value });
          }}
          onBlur={() => {
            allLetter(body.Name);
          }}
        />
        <br />
        <br />
        <DialogContentText id="text-dialog">
          Duration of the survey in days
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
          onChange={(freq) => {
            handleDateChangeSprintLength(
              Number(freq.target.value)
            );
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
          Numbers of person to vote
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
          onChange={(mem) =>
            handleDateChangeMembers(Number(mem.target.value))
          }
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
            type="submit"
            disabled={disabledSubmit}
            id="save-btn"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              handleClose(!open);
              resetValues();
            }}
            size="large"
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </form>
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
    error: {
      color: "#FF0000",
    },
  })
);
export default CreateTeamDialog;
