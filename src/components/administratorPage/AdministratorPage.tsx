import React from "react";
import "./AdministratorPage.css";
import { Button } from "@material-ui/core";
import { ManageUserService } from "../../services/Services";
import NavBar from "../navBar/NavBar";

const AdministratorPage = () => {
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

  return (
    <div>
      <NavBar user={true}></NavBar>
      <Button
        onClick={() => {
          getAllUsers(token);
        }}
        size="large"
      >
        getUsers
      </Button>
    </div>
  );
};

export default AdministratorPage;
