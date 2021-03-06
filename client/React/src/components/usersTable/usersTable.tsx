import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";

import "./usersTable.css";
import EditUserDialog from "../editUserDialog/EditUserDialog";
import { ManageUserService } from "../../services/Services";
import { IUserTable, IUser, IUserData } from "../../models/interfaces";
import colors from "../../config/colors";

export default function UsersTable({
  loadingService,
  teams,
  users,
  setLoadingP,
  setMessage,
  setOpenMessage,
}: {
  loadingService: boolean;
  teams: any;
  users: IUser[];
  setLoadingP: any;
  setMessage: any;
  setOpenMessage: any;
}) {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState<IUserData[]>([
    { Id: 0, Full_name: "", Email: "", Role: "", Teams: "" },
  ]);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClose = (bool: boolean) => {
    setOpenEdit(bool);
  };
  const [currentUser, setCurrentUser] = useState<IUser>();
  // eslint-disable-next-line
  const [state, setState] = useState<IUserTable>({
    columns: [
      { title: "FULL NAME", field: "Full_name" },
      { title: "EMAIL", field: "Email" },
      {
        title: "ROLE",
        field: "Role",
      },
      {
        title: "TEAMS",
        field: "Teams",
      },
    ],
  });

  const usersList: ManageUserService = new ManageUserService();

  // Fucntion that calls the service to delete a user
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

  //Function that tranforms the data to display properly in the table each time users are updated
  useEffect(() => {
    const transformedUsers: IUserData[] = [];
    users.forEach((user) => {
      const newUserData: IUserData = {
        Email: "",
        Full_name: "",
        Id: 0,
        Role: "",
        Teams: "",
        Password: "",
      };
      newUserData.Id = user.Id;
      newUserData.Email = user.Email;
      newUserData.Full_name = user.Full_name;
      newUserData.Password = user.Password;
      newUserData.Role = user.Role.Name;
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
        isLoading={loadingService}
        title=""
        columns={state.columns}
        data={data}
        components={{
          OverlayLoading: (props) => (
            <CircularProgress
              size={24}
              style={{
                color: colors.primary,
                position: "relative",
                top: "50%",
                left: "49%",
              }}
            />
          ),
        }}
        localization={{
          body: {
            editRow: {
              deleteText: "Are you sure you want to delete this user?",
            },
            emptyDataSourceMessage: "",
          },
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit user",
            onClick: (event, rowData) => {
              setOpenEdit(true);
              let data: IUserData = {
                Email: "",
                Full_name: "",
                Id: 0,
                Role: "",
                Teams: "",
                Password: "",
                tableData: { id: 0 },
              };
              if (Array.isArray(rowData)) {
                data = rowData[0];
              } else {
                data = rowData;
              }
              const index: number | undefined = data.tableData?.id;
              if (index !== undefined) {
                setCurrentUser(users[index]);
              }
            },
          },
        ]}
        options={{ search: true, actionsColumnIndex: -1, draggable: false }}
        editable={{
          onRowDelete: (oldData) => delUser(token, oldData.Id.toString()),
        }}
      />
      <EditUserDialog
        currentUser={currentUser}
        handleClose={handleClose}
        setLoading={setLoadingP}
        open={openEdit}
        teams={teams}
        setMessage={setMessage}
        setOpenMessage={setOpenMessage}
      />
    </>
  );
}
