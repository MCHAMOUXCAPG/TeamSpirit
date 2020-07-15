import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import { ManageUserService } from "../../services/Services";
import { IUserTable, IUser } from "../../models/interfaces";

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
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
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
        setMessage("User succesfully deleted");
        setLoading(false);
        setOpenMessage(true);
      })
      .catch((err) => {
        setMessage("Something went wrong. Try again later.");
        setLoading(false);
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
          options={{ search: true, actionsColumnIndex: -1 }}
          editable={{
            onRowDelete: (oldData) => delUser(token, oldData.Id.toString()),
          }}
        />
      )}
    </>
  );
}
