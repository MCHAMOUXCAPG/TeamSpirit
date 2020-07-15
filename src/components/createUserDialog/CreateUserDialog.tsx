import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import { IUserDTO, ITeamDTO } from "../../models/interfaces";
import "./CreateUserDialog.css";

const CreateUserDialog = ({
  open,
  handleClose,
  teams,
  setLoading,
  setMessage,
  setOpenMessage,
}: {
  open: boolean;
  handleClose: (bool: boolean) => void;
  teams: ITeamDTO[];
  setLoading: any;
  setMessage: any;
  setOpenMessage: any;
}) => {
  const [body, setBody] = useState<IUserDTO>({
    Full_name: "",
    Email: "",
    Password: "",
    Roles: [{ Id: 0, Name: "", UserID: 0 }],
    Teams: [{ Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" }],
  });
  const CustomInput = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "label + &": {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        width: 350,
        borderRadius: 25,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #919191",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: ["Roboto"].join(","),
        "&:focus": {
          borderRadius: 25,
          borderColor: "#80bdff",
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
      },
    })
  )(InputBase);
  const [role, setRole] = React.useState("");
  const handleChangeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const [selectedTeams, setSelectedTeams] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTeams(event.target.value as string[]);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const classes = useStyles();
  const handleSubmit = () => {
    setLoading(true);
    handleClose(!open);
    setTimeout(() => {
      console.log(body);
      setMessage("User succesfully created");
      setLoading(false);
      setOpenMessage(true);
    }, 1500); // mock the service
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
          Roles: [{ Id: 0, Name: "", UserID: 0 }],
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
          id="input-num-1"
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
          id="input-num-1"
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
          id="input-num-1"
          fullWidth
          variant="outlined"
          className={classes.root}
          onChange={(freq) => {
            setBody({ ...body, Password: freq.target.value });
          }}
        />
        <br />
        <br />
        <FormControl>
          <Select
            id="demo-customized-select"
            value={role}
            onChange={handleChangeRole}
            input={<CustomInput />}
          >
            <MenuItem disabled value="">
              <em>Choose the user Role</em>
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="TeamLeader">Team Leader</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <Select
            multiple
            displayEmpty
            value={selectedTeams}
            onChange={handleChange}
            input={<CustomInput />}
            renderValue={(selected) => {
              if ((selected as string[]).length === 0) {
                return <em>Choose one or more Teams</em>;
              }
              return (selected as string[]).join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem>
            {teams.map((team: ITeamDTO) => (
              <MenuItem key={team.Name} value={team.Name}>
                {team.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
