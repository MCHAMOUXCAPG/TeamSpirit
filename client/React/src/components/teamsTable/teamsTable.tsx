import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";

import "./teamsTable.css";
import { ManageTeamService } from "../../services/Services";
import EditTeamDialog from "../editTeamDialog/EditTeamDialog";
import { ITeamTable, ITeam, ITeamData } from "../../models/interfaces";
import colors from "../../config/colors";

export default function TeamsTable({
  loadingService,
  teams,
  setLoadingP,
  setMessage,
  setOpenMessage,
}: {
  loadingService: boolean;
  teams: any;
  setLoadingP: any;
  setMessage: any;
  setOpenMessage: any;
}) {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState<ITeamData[]>([
    { Name: "", Frequency: 0, StartDate: "", Num_mumbers: 0 },
  ]);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClose = (bool: boolean) => {
    setOpenEdit(bool);
  };
  const [currentTeam, setCurrentTeam] = useState<ITeam>();
  // eslint-disable-next-line
  const [state, setState] = useState<ITeamTable>({
    columns: [
      { title: "NAME", field: "Name" },
      { title: "MEMBERS", field: "Num_mumbers" },
      {
        title: "FREQUENCY",
        field: "Frequency",
      },
      {
        title: "START DATE",
        field: "StartDate",
      },
    ],
  });

  const teamList: ManageTeamService = new ManageTeamService();

  // Fucntion that calls the service to delete a user
  async function delTeam(token: string | null, teamName: string) {
    await teamList
      .deleteTeam(token, teamName)
      .then((res: any) => {
        setMessage("Team succesfully deleted");
        setLoadingP(false);
        setOpenMessage(true);
      })
      .catch((err) => {
        setMessage("Something went wrong. Try again later.");
        setLoadingP(false);
        setOpenMessage(true);
      });
  }

  //Function that tranforms the data to display properly in the table each time team are updated
  useEffect(() => {
    const transformedTeams: ITeamData[] = [];
    teams.forEach((team: { Frequency: number; Name: string; Num_mumbers: number; StartDate: string; }) => {
      const newTeamData: ITeamData = {
        Frequency: 0,
        Name: "",
        Num_mumbers: 0,
        StartDate: "",
      };
      newTeamData.Frequency = team.Frequency;
      newTeamData.Name = team.Name;
      newTeamData.Num_mumbers = team.Num_mumbers;
      newTeamData.StartDate = team.StartDate;
      transformedTeams.push(newTeamData);
    });
    setData(transformedTeams);
  }, [teams]);

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
              deleteText: "Are you sure you want to delete this team?",
            },
            emptyDataSourceMessage: "",
          },
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit team",
            onClick: (event, rowData) => {
              setOpenEdit(true);
              let data: ITeamData = {
                Frequency: 0,
                Name: "",
                Num_mumbers: 0,
                StartDate: "",
                tableData: { id: 0 },
              };
              if (Array.isArray(rowData)) {
                data = rowData[0];
              } else {
                data = rowData;
              }
              const index: number | undefined = data.tableData?.id;
              if (index !== undefined) {
                setCurrentTeam(teams[index]);
              }
            },
          },
        ]}
        options={{ search: true, actionsColumnIndex: -1, draggable: false }}
        editable={{
          onRowDelete: (oldData) => delTeam(token, oldData.Name.toString()),
        }}
      />
      <EditTeamDialog
        currentTeam={currentTeam}
        handleClose={handleClose}
        setLoading={setLoadingP}
        open={openEdit}
        setMessage={setMessage}
        setOpenMessage={setOpenMessage}
      />
    </>
  );
}
