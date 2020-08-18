import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IUserDTO, ITeamDTO, IRole, IUser } from "../../models/interfaces";
import { ManageUserService } from "../../services/Services";
import Select from "react-dropdown-select";
import "./EditUserDialog.css";

const EditUserDialog = ({
  currentUser,
  open,
  handleClose,
  teams,
  setLoading,
  setMessage,
  setOpenMessage,
}: {
  currentUser: IUser | undefined;
  open: boolean;
  handleClose: (bool: boolean) => void;
  teams: ITeamDTO[];
  setLoading: any;
  setMessage: any;
  setOpenMessage: any;
}) => {
  const token = sessionStorage.getItem("token");
  const [body, setBody] = useState<IUserDTO>({
    Full_name: "",
    Email: "",
    Password: "",
    Role: { Id: 0, Name: "" },
    Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
  });

  const [Err, setErr] = useState(false);
  const [HelperTxt, setHelperTxt] = useState("");
  const [ErrEmail, setErrEmail] = useState(false);
  const [helperTxtEmail, setHelperTxtEmail] = useState("");
  const [validateSubmit, setValidateSubmit] = useState([true, true]);

  // Function that disables the "Update" button if either name or email aren't considered as valid.
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
    if (count === 2) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  };

  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const manageService: ManageUserService = new ManageUserService();

  // Function that updates the user and saves the user to the database with the new changes.
  async function updateUser(body: IUserDTO, id: string, token: string | null) {
    await manageService
      .updateUser(body, id, token)
      .then((res: any) => {
        setBody({
          Full_name: "",
          Email: "",
          Password: "",
          Role: { Id: 0, Name: "" },
          Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
        });
        setMessage("User succesfully updated.");
        setLoading(false);
        setOpenMessage(true);
        setDisabledSubmit(false);
      })
      .catch((err) => {
        setBody({
          Id: 0,
          Full_name: "",
          Email: "",
          Password: "",
          Role: { Id: 0, Name: "" },
          Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
        });
        setMessage("Something went wrong. Try again later.");
        setLoading(false);
        setOpenMessage(true);
        setDisabledSubmit(false);
      });
  }

  // Function that validates if the full name of the user only contains alphabet characters.
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

  // Function that validates the email.
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

  const [id, setId] = useState<string>("");
  const [fullName, setFullName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [role, setRole] = useState<IRole>({ Id: 0, Name: "" });
  const [team, setTeam] = useState<ITeamDTO[]>([
    { Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" },
  ]);

  // Function that loads the information of the user we want to edit.
  useEffect(() => {
    if (currentUser) {
      setId(currentUser.Id.toString());
      setFullName(currentUser?.Full_name);
      setEmail(currentUser?.Email);
      setRole(currentUser?.Role);
      setTeam(currentUser?.Teams);
      setBody(currentUser);
    }
    // eslint-disable-next-line
  }, [open]);

  // Function that adds new team/s to the array.
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

  const classes = useStyles();
  const handleSubmit = () => {
    setLoading(true);
    handleClose(!open);
    updateUser(body, id, token);
  };

  return (
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
      <DialogTitle id="dialog-title">Edit this User</DialogTitle>
      <DialogContent>
        <TextField
          required
          placeholder="Name"
          id="input-num-1"
          fullWidth
          variant="outlined"
          error={Err}
          helperText={HelperTxt}
          className={classes.root}
          value={fullName}
          onChange={(name) => {
            setFullName(name.target.value);
            setBody({ ...body, Full_name: name.target.value });
          }}
          onBlur={() => {
            allLetter(body.Full_name);
          }}
        />
        <br />
        <br />
        <TextField
          type="Email"
          required
          placeholder="Email"
          id="input-num-2"
          fullWidth
          variant="outlined"
          error={ErrEmail}
          helperText={helperTxtEmail}
          className={classes.root}
          value={email}
          onChange={(email) => {
            setEmail(email.target.value);
            setBody({ ...body, Email: email.target.value });
          }}
          onBlur={() => {
            validarEmail(body.Email);
          }}
        />
        <br />
        <br />
        <Select
          values={[role]}
          placeholder="Choose a user Role"
          dropdownHeight="200px"
          dropdownPosition="top"
          options={[role]}
          disabled
          labelField="Name"
          onChange={() => {}}
        />
        <br />
        <Select
          disabled={role.Id === 1 ? true : false}
          values={team}
          multi
          keepSelectedInList={false}
          placeholder="Choose one or more Teams"
          dropdownHeight="200px"
          dropdownPosition="top"
          options={teams}
          onChange={(values) => {
            handleChangeTeams(values);
          }}
          labelField="Name"
          valueField="Name"
        />
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
export default EditUserDialog;
