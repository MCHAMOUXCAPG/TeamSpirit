import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  const [body, setBody] = useState<IUserDTO>({
    Full_name: "",
    Email: "",
    Password: "",
    Role: { Id: 0, Name: "" },
    Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
  });
  const manageService: ManageUserService = new ManageUserService();

  async function createUser(body: IUserDTO, token: string | null) {
    await manageService
      .createUser(body, token)
      .then((res: any) => {
        setBody({
          Full_name: "",
          Email: "",
          Password: "",
          Role: { Id: 0, Name: "" },
          Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
        });
        setMessage("User succesfully created");
        setLoading(false);
        setOpenMessage(true);
      })
      .catch((err) => {
        setBody({
          Full_name: "",
          Email: "",
          Password: "",
          Role: { Id: 0, Name: "" },
          Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
        });
        setMessage("Something went wrong. Try again later.");
        setLoading(false);
        setOpenMessage(true);
      });
  }

  const classes = useStyles();
  const handleSubmit = () => {
    setLoading(true);
    handleClose(!open);
    console.log(body);
    createUser(body, token);
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
      <DialogTitle id="dialog-title">
        Fill this form to create a User
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          placeholder="Name"
          id="input-num-4"
          fullWidth
          variant="outlined"
          className={classes.root}
          onChange={(freq) => {
            setBody({ ...body, Full_name: freq.target.value });
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
          className={classes.root}
          onChange={(freq) => {
            setBody({ ...body, Email: freq.target.value });
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
          variant="outlined"
          className={classes.root}
          onChange={(freq) => {
            setBody({ ...body, Password: freq.target.value });
          }}
        />
        <br />
        <br />
        <Select
          values={[]}
          placeholder="Choose a user Role"
          dropdownHeight="200px"
          dropdownPosition="top"
          options={roles}
          onChange={(values) => {
            setBody({ ...body, Role: values[0] });
          }}
          labelField="Name"
          valueField="Name"
        />
        <br />
        <Select
          values={[]}
          multi
          keepSelectedInList={false}
          placeholder="Choose one or more Teams"
          dropdownHeight="200px"
          dropdownPosition="top"
          options={teams}
          onChange={(values) => {
            setBody({ ...body, Teams: values });
          }}
          labelField="Name"
          valueField="Name"
        />
      </DialogContent>
      <DialogActions style={{ marginBottom: 10 }}>
        <Button onClick={handleSubmit} color="primary" size="large">
          Save
        </Button>
        <Button
          onClick={() => {
            handleClose(!open);
          }}
          size="large"
          color="primary"
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
export default CreateUserDialog;
