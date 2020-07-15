import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ManageUserService } from "../../services/Services";
import { IUserTable, IUser } from "../../models/interfaces";
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
  const [data, setData] = useState<IUser[]>([]);
  // eslint-disable-next-line
  const [state, setState] = useState<IUserTable>({
    columns: [
      { title: "FULL NAME", field: "Full_name" },
      { title: "EMAIL", field: "Email" },
      {
        title: "ROLE",
        field: "Roles.Name",
        lookup: { 1: "User", 2: "Team Leader", 3: "Administrator" },
      },
      {
        title: "TEAMS",
        field: "Teams",
        lookup: { 1: "GORN", 2: "PINPLANE" },
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
    setData(users);
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
