import React from "react";
import "./AdministratorPage.css";
import { Button, Container, Grid } from "@material-ui/core";
import { ManageUserService } from "../../services/Services";
import NavBar from "../navBar/NavBar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const AdministratorPage = () => {
  const usersList: ManageUserService = new ManageUserService();
  const token = sessionStorage.getItem("token");

  const [value, setValue] = React.useState(0);
  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
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
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  getAllUsers(token);
  console.log(getAllUsers(token));
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
            <Button onClick={() => {}} size="large" color="primary">
              Create User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdministratorPage;
