import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Tab,
  Tabs,
} from "@material-ui/core";
import { ManageUserService } from "../../services/Services";
import { ITeamDTO, IUser, IRole } from "../../models/interfaces";
import CreateUserDialog from "../createUserDialog/CreateUserDialog";
import CreateTeamDialog from "../createTeamDialog/CreateTeamDialog";
import NavBar from "../navBar/NavBar";
import UsersTable from "../usersTable/usersTable";
import TeamsTable from "../teamsTable/teamsTable";
import colors from "../../config/colors";
import "./AdministratorPage.css";

const AdministratorPage = () => {
  const [value, setValue] = useState(0);
  const [roles, setRoles] = useState<IRole[]>([{ Id: 1, Name: "Admin" }]);
  const [open, setOpen] = useState(false); // Handles if the pop-up of create user dialog is open
  const [openTeam, setOpenTeam] = useState(false); // Handles if the pop-up of create team dialog is open
  const [loadingServiceUsers, setLoadingServiceUsers] = useState(true); // if get all users is loading
  const [loadingServiceTeams, setLoadingServiceTeams] = useState(true); // if get all teams is loading
  const [loading, setLoading] = useState(false); // if some service is awaiting
  const [message, setMessage] = useState("Mensaje de prueba"); // message when resolve the service
  const [openMessage, setOpenMessage] = useState(false); // handles the open/close message dialog

  const handleClose = (bool: boolean) => {
    setOpen(bool);
  };
  const handleCloseTeam = (bool: boolean) => {
    setOpenTeam(bool);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClickCloseMessage = () => {
    setOpenMessage(false);
  };

  const [teams, setTeams] = useState<ITeamDTO[]>([
    { Frequency: 0, Name: "", Num_mumbers: 0, StartDate: "" },
  ]);

  const [users, setUsers] = useState<IUser[]>([]);

  function a11yProps(index: any) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const usersList: ManageUserService = new ManageUserService();
  const token = sessionStorage.getItem("token");

  // Function that retrieves all the users from the database.
  async function getAllUsers(token: string | null) {
    await usersList
      .getUsers(token)
      .then((res: any) => {
        setUsers(res.data);
        setLoadingServiceUsers(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function that retrieves all the teams from the database.
  async function getAllTeams(token: string | null) {
    await usersList
      .getTeams(token)
      .then((res: any) => {
        setTeams(res.data);
        setLoadingServiceTeams(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function that retrieves all the roles from the database.
  async function getAllRoles(token: string | null) {
    await usersList
      .getRoles(token)
      .then((res: any) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function to be recalling the services in case there have been any changes in the tables.
  useEffect(() => {
    getAllUsers(token);
    getAllTeams(token);
    getAllRoles(token);
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
            <div className="team-name">TeamSpirit Managment</div>
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Users" {...a11yProps(0)} id="user-tab" />
               <Tab label="Teams" {...a11yProps(1)} id="team-tab" />
              {/*<Tab label="Surveys" {...a11yProps(2)} id="question-tab" /> */}
            </Tabs>
          </Grid>
          <Grid item xs={12} id="table-container">
            {value === 0 && (
              <>
                <Button
                  onClick={() => {
                    setOpen(!open);
                  }}
                  size="large"
                  color="primary"
                  style={{
                    position: "relative",
                    top: 50,
                    zIndex: 20,
                    left: "90%",
                  }}
                >
                  Create User
                </Button>
                <UsersTable
                  loadingService={loadingServiceUsers}
                  teams={teams}
                  users={users}
                  setLoadingP={setLoading}
                  setMessage={setMessage}
                  setOpenMessage={setOpenMessage}
                />
              </>
            )}
            {value === 1 && (
              <>
                <Button
                  onClick={() => {
                    setOpenTeam(!open);
                  }}
                  size="large"
                  color="primary"
                  style={{
                    position: "relative",
                    top: 50,
                    zIndex: 20,
                    left: "90%",
                  }}
                >
                  Create Team
                </Button>
                <TeamsTable
                  loadingService={loadingServiceTeams}
                  teams={teams}
                  setLoadingP={setLoading}
                  setMessage={setMessage}
                  setOpenMessage={setOpenMessage}
                />
              </>
            )}
            {value === 2 && <div>Item 3</div>}
          </Grid>
        </Grid>
      </Container>
      <CreateUserDialog
        open={open}
        handleClose={handleClose}
        teams={teams}
        roles={roles}
        setLoading={setLoading}
        setMessage={setMessage}
        setOpenMessage={setOpenMessage}
      />
      <CreateTeamDialog
        open={openTeam}
        handleClose={handleCloseTeam}
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
