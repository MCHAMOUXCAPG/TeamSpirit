import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ManageUserService } from "../../services/Services";
import { IUserTable, IUser, IUserData } from "../../models/interfaces";
import "./usersTable.css";

export default function MaterialTableDemo({
  users,
  setLoadingP,
  setMessage,
  setOpenMessage,
}: {
  users: IUser[];
  setLoadingP: any;
  setMessage: any;
  setOpenMessage: any;
}) {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState<IUserData[]>([]);
  // eslint-disable-next-line
  const [state, setState] = useState<IUserTable>({
    columns: [
      { title: "FULL NAME", field: "Full_name" },
      { title: "EMAIL", field: "Email" },
      {
        title: "ROLE",
        field: "Roles",
      },
      {
        title: "TEAMS",
        field: "Teams",
      },
    ],
  });

  const usersList: ManageUserService = new ManageUserService();

  async function delUser(token: string | null, userId: string) {
    await usersList
      .deleteUser(token, userId)
      .then((res: any) => {
        setMessage("User succesfully deleted");
        setLoadingP(false);
        setOpenMessage(true);
      })
      .catch((err) => {
        setMessage("Something went wrong. Try again later.");
        setLoadingP(false);
        setOpenMessage(true);
      });
  }

  useEffect(() => {
    const transformedUsers: IUserData[] = [];
    // tranform the data to display properly in the table
    users.forEach((user) => {
      const newUserData: IUserData = {
        Email: "",
        Full_name: "",
        Id: 0,
        Roles: "",
        Teams: "",
        Password: "",
      };
      newUserData.Id = user.Id;
      newUserData.Email = user.Email;
      newUserData.Full_name = user.Full_name;
      newUserData.Password = user.Password;
      newUserData.Roles = user.Roles[0].Name;
      let teamsString = "";
      if (user.Teams.length === 0) {
        teamsString = "No Team";
      }
      user.Teams.forEach((team, index) => {
        if (index === user.Teams.length - 1) {
          teamsString += team.Name;
        } else {
          teamsString += team.Name + ", ";
        }
      });
      newUserData.Teams = teamsString;
      transformedUsers.push(newUserData);
    });
    setData(transformedUsers);
  }, [users]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      <MaterialTable
        title=""
        columns={state.columns}
        data={data}
        actions={[
          {
            icon: "edit",
            tooltip: "edit user",
            onClick: (event, rowData) => alert("edit"), //Must call edit PopUp here
          },
        ]}
        options={{ search: true, actionsColumnIndex: -1 }}
        editable={{
          onRowDelete: (oldData) => delUser(token, oldData.Id.toString()),
        }}
      />
    </>
  );
}
