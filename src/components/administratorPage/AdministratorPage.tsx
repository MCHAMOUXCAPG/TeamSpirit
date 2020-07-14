import React, { useState, useEffect } from "react";
import "./AdministratorPage.css";
import { Button, Container, Grid } from "@material-ui/core";
import { ManageUserService } from "../../services/Services";
import NavBar from "../navBar/NavBar";
import CreateUserDialog from "../createUserDialog/CreateUserDialog";
import { ITeamDTO } from "../../models/interfaces";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const AdministratorPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const handleClose = (bool: boolean) => {
    setOpen(bool);
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
  }, []);

  return (
    <div>
      <NavBar user={true}></NavBar>
      <Container maxWidth="lg" id="container-adm" disableGutters={true}>
        <Grid
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
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              size="large"
              color="primary"
            >
              Create User
            </Button>
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
            {value === 0 && <div>Item 1</div>}
            {value === 1 && <div>Item 2</div>}
            {value === 2 && <div>Item 3</div>}
          </Grid>
        </Grid>
      </Container>
      <CreateUserDialog open={open} handleClose={handleClose} teams={teams} />
    </div>
  );
};

export default AdministratorPage;
