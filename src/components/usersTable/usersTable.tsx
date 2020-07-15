import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import { ManageUserService } from "../../services/Services";
import { IUserTable } from "../../models/interfaces";

export default function MaterialTableDemo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<IUserTable>({
    columns: [
      { title: "FULL NAME", field: "Full_name" },
      { title: "EMAIL", field: "Email" },
      {
        title: "ROLES",
        field: "Roles",
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
  const token = sessionStorage.getItem("token");
  async function getAllUsers(token: string | null) {
    await usersList
      .getUsers(token)
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function delUser(token: string | null, userId: string) {
    await usersList
      .deleteUser(token, userId)
      .then((res: any) => {
        getAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllUsers(token);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {loading ? (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            color: "#000",
          }}
        />
      ) : (
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
          options={{ search: false, actionsColumnIndex: -1 }}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  delUser(token, oldData.Id.toString());
                }, 600);
              }),
          }}
        />
      )}
    </>
  );
}
