import React, { useState, useEffect } from "react";
import "./AdministratorPage.css";
import { Button, Container, Grid } from "@material-ui/core";
import { ManageUserService } from "../../services/Services";
import NavBar from "../navBar/NavBar";
import CreateUserDialog from "../createUserDialog/CreateUserDialog";
import { ITeamDTO } from "../../models/interfaces";
import colors from "../../config/colors";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import UsersTable from "../usersTable/usersTable";

const AdministratorPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false); // handles create user dialog
  const handleClose = (bool: boolean) => {
    setOpen(bool);
  };
  const [loading, setLoading] = useState(false); // if some service is awaiting
  const [message, setMessage] = useState("Mensaje de prueba"); // message when resolve the service
  const [openMessage, setOpenMessage] = useState(false); // handles the open/close message dialog
  const handleClickCloseMessage = () => {
    setOpenMessage(false);
  };
  const [teams, setTeams] = useState<ITeamDTO[]>([
    { Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" },
  ]);
  function a11yProps(index: any) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  const usersList: ManageUserService = new ManageUserService();
  const token = sessionStorage.getItem("token");

  async function getAllUsers(token: string | null) {
    await usersList
      .getUsers(token)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getAllTeams(token: string | null) {
    await usersList
      .getTeams(token)
      .then((res: any) => {
        console.log(res.data);
        setTeams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllUsers(token);
    getAllTeams(token);
    // eslint-disable-next-line
  }, [openMessage]);

  return (
    <div>
      <NavBar user={true}></NavBar>
      <Container maxWidth="lg" id="container-adm" disableGutters={true}>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              color: colors.primary,
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        )}

        <Grid
          style={{ opacity: loading ? 0.5 : 1 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <div className="team-name">TeamSpirit Admin</div>
          </Grid>
          <Grid item xs={12}>
            {value === 0 && (
              <Button
                onClick={() => {
                  setOpen(!open);
                }}
                size="large"
                color="primary"
              >
                Create User
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Users" {...a11yProps(0)} id="user-tab" />
              <Tab label="Teams" {...a11yProps(1)} id="question-tab" />
              <Tab label="Surveys" {...a11yProps(2)} id="question-tab" />
            </Tabs>
          </Grid>
          <Grid item xs={12} id="Grid-adm-inner">
            {value === 0 && <UsersTable />}
            {value === 1 && <div>Item 2</div>}
            {value === 2 && <div>Item 3</div>}
          </Grid>
        </Grid>
      </Container>
      <CreateUserDialog
        open={open}
        handleClose={handleClose}
        teams={teams}
        setLoading={setLoading}
        setMessage={setMessage}
        setOpenMessage={setOpenMessage}
      />

      <Dialog
        open={openMessage}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={handleClickCloseMessage}
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
          <p>{message}</p>
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
            onClick={handleClickCloseMessage}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdministratorPage;
