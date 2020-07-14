import React, { useContext } from "react";
import "./AdministratorPage.css";
import { Button } from "@material-ui/core";
import { ManageUserService } from "../../services/Services";

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
    <Button
      onClick={() => {
        getAllUsers(token);
      }}
      size="large"
    >
      getUsers
    </Button>
  );
};

export default AdministratorPage;
