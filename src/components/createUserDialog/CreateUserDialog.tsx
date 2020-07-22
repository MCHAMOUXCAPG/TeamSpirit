import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { IUserDTO, ITeamDTO, IRole } from "../../models/interfaces";
import "./CreateUserDialog.css";
import { ManageUserService } from "../../services/Services";
import Select from "react-dropdown-select";

const CreateUserDialog = ({
  open,
  handleClose,
  teams,
  roles,
  setLoading,
  setMessage,
  setOpenMessage,
}: {
  open: boolean;
  handleClose: (bool: boolean) => void;
  teams: ITeamDTO[];
  roles: IRole[];
  setLoading: any;
  setMessage: any;
  setOpenMessage: any;
}) => {
  const token = sessionStorage.getItem("token");
  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const [ErrEmail, setErrEmail] = useState(false);
  const [ErrPass, setErrPass] = useState(false);
  const [helperTxtPass, setHelperTxtPass] = useState("");
  const [helperTxtEmail, setHelperTxtEmail] = useState("");
  const [helperTxtRole, setHelperTxtRole] = useState("");
  const [helperTxtTeam, setHelperTxtTeam] = useState("");
  const [validateSubmit, setValidateSubmit] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [disabledTeams, setDisabledTeams] = useState(true);
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
    if (count === 5) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  };
  const [body, setBody] = useState<IUserDTO>({
    Full_name: "",
    Email: "",
    Password: "",
    Role: roles[0],
    Teams: [],
  });
  const manageService: ManageUserService = new ManageUserService();

  const resetValues = () => {
    setBody({
      Full_name: "",
      Email: "",
      Password: "",
      Role: roles[0],
      Teams: [],
    });
    setValidateSubmit([false, false, false, false, false]);
    setDisabledSubmit(true);
    setDisabledTeams(true);
    setErr(false);
    setHelperTxt("");
    setErrEmail(false);
    setErrPass(false);
    setHelperTxtPass("");
    setHelperTxtEmail("");
    setHelperTxtRole("");
    setHelperTxtTeam("");
  };
  async function createUser(body: IUserDTO, token: string | null) {
    await manageService
      .createUser(body, token)
      .then((res: any) => {
        resetValues();
        setMessage("User succesfully created.");
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

  const handleChangeTeams = (teams: ITeamDTO[]) => {
    let newTeams: ITeamDTO[] = [];
    teams.forEach((team: ITeamDTO) => {
      let newTeam: ITeamDTO = {
        Frequency: 0,
        Name: "",
        Num_mumbers: 0,
        StartDate: "",
      };
      newTeam.Frequency = team.Frequency;
      newTeam.Name = team.Name;
      newTeam.Num_mumbers = team.Num_mumbers;
      newTeam.StartDate = team.StartDate;
      newTeams.push(newTeam);
    });
    setBody({ ...body, Teams: newTeams });
  };
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
  function validarEmail(valor: string) {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valor)) {
      setErrEmail(false);
      setHelperTxtEmail("");
      updateValidateSubmit(1, true);
    } else {
      setErrEmail(true);
      setHelperTxtEmail("Please enter a valid email address!");
      updateValidateSubmit(1, false);
    }
  }
  function validatePass(valor: string) {
    if (/^.{6,}$/.test(valor)) {
      setErrPass(false);
      setHelperTxtPass("");
      updateValidateSubmit(2, true);
    } else {
      setErrPass(true);
      setHelperTxtPass("Password must have at least 6 characters!");
      updateValidateSubmit(2, false);
    }
  }

  function validateRole(role: IRole) {
    const valor = role.Id;
    if (valor === 1) {
      setBody({ ...body, Teams: [] });
      setHelperTxtRole("");
      setHelperTxtTeam("");
      updateValidateSubmit(3, true);
      updateValidateSubmit(4, true);
      setDisabledTeams(true);
    } else if (valor === 2) {
      setHelperTxtRole("");
      updateValidateSubmit(3, true);
      updateValidateSubmit(4, false);
      setDisabledTeams(false);
    } else {
      setHelperTxtRole("You must choose a Role for the user!");
      updateValidateSubmit(3, false);
      updateValidateSubmit(4, false);
      setDisabledTeams(true);
    }
  }
  function validateTeams(teams: ITeamDTO[]) {
    if (teams.length > 0) {
      // En caso de ser TeamLeader y tener teams
      setHelperTxtTeam("");
      updateValidateSubmit(4, true);
    } else {
      setHelperTxtTeam("You must choose a Team for the user!");
      updateValidateSubmit(4, false);
    }
  }
  const classes = useStyles();
  const handleSubmit = () => {
    setLoading(true);
    handleClose(!open);
    createUser(body, token);
  };
  return (
    <form>
      <Dialog
        open={open}
        onClose={() => {
          handleClose(!open);
          setBody({
            Full_name: "",
            Email: "",
            Password: "",
            Role: { Id: 0, Name: "" },
            Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
          });
        }}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="dialog-title">
          Fill this form to create a User
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            error={Err}
            helperText={HelperTxt}
            placeholder="Name"
            id="input-num-4"
            fullWidth
            variant="outlined"
            className={classes.root}
            onChange={(freq) => {
              setBody({ ...body, Full_name: freq.target.value });
            }}
            onBlur={() => {
              allLetter(body.Full_name);
            }}
          />
          <br />
          <br />
          <TextField
            type="email"
            required
            error={ErrEmail}
            helperText={helperTxtEmail}
            placeholder="Email"
            id="input-num-2"
            fullWidth
            variant="outlined"
            className={classes.root}
            onChange={(freq) => {
              setBody({ ...body, Email: freq.target.value });
            }}
            onBlur={() => {
              validarEmail(body.Email);
            }}
          />
          <br />
          <br />
          <TextField
            type="Password"
            required
            placeholder="Password"
            id="input-num-3"
            fullWidth
            error={ErrPass}
            helperText={helperTxtPass}
            variant="outlined"
            className={classes.root}
            onChange={(freq) => {
              setBody({ ...body, Password: freq.target.value });
            }}
            onBlur={() => {
              validatePass(body.Password);
            }}
          />
          <br />
          <br />
          <Select
            closeOnSelect
            values={[]}
            placeholder="Choose a user Role"
            dropdownHeight="200px"
            dropdownPosition="top"
            options={roles}
            onChange={(values) => {
              setBody({ ...body, Role: values[0] });
              validateRole(values[0]);
            }}
            labelField="Name"
            valueField="Name"
          />
          <FormHelperText className={classes.error}>
            {helperTxtRole}
          </FormHelperText>
          <br />
          <Select
            values={[]}
            multi
            keepSelectedInList={false}
            placeholder="Choose one or more Teams (TeamLeader)"
            dropdownHeight="200px"
            dropdownPosition="top"
            options={teams}
            onChange={(values) => {
              handleChangeTeams(values);
              validateTeams(values);
            }}
            labelField="Name"
            valueField="Name"
            disabled={disabledTeams}
          />
          <FormHelperText className={classes.error}>
            {helperTxtTeam}
          </FormHelperText>
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
export default CreateUserDialog;
