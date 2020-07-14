import React, { useContext } from "react";
import "./AdministratorPage.css";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../navBar/NavBar";
import { AuthContext } from "../../context/auth";
const AdministratorPage = () => {
  const context = useContext(AuthContext);
  context.setCurrentTeam("oneTeam");
  return <NavBar user={true}></NavBar>;
};

export default AdministratorPage;
