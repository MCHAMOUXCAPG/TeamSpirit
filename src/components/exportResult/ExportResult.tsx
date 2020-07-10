import React, { useState } from "react";
import "./ExportResult.css";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Container,
  Grid,
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SurveyService } from "../../services/Services";
import FileSaver from "file-saver";

function ExportResult() {
  const [startDate, setStartDate] = useState<Date | string>(new Date());
  const [endDate, setEndDate] = useState<Date | string>(new Date());
  const classes = useStyles();
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState("");

  const surveyService: SurveyService = new SurveyService();

  const getCSVdownload = async (
    startDate: string,
    endDate: string,
    token: string | null
  ) => {
    await surveyService
      .getCSV(startDate, endDate, token)
      .then((res) => {
        console.log(startDate);
        console.log(endDate);
        console.log(token);
        setData(res.data);
        console.log(data);
        const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
        FileSaver.saveAs(csvData, "data.csv");

        // Works perfectly on second attemp, First attemp doesn't store the data correctly.
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ExpansionPanel id="export-container">
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="title"
        >
          <Typography>
            <NoteAddIcon className="export-icon" />
            PREPARE RESULTS TO EXPORT
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <p className="info-text">
              Please, select the Sprints and export your CSV.
            </p>
            <div>
              <Container
                maxWidth="lg"
                className="grid-content"
                disableGutters={true}
              >
                <Grid container spacing={8} direction="row" justify="center">
                  <Grid item xs={1}>
                    <p className="text">From:</p>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="date-position">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          format="yyyy-MM-dd"
                          inputVariant="outlined"
                          margin="normal"
                          className={classes.root}
                          id="date-picker-inline"
                          value={startDate}
                          onChange={(date: any) => {
                            let formattedDate = format(date, "yyyy-MM-dd");
                            setStartDate(formattedDate);
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <p className="text" id="p-position">
                      To:
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="date-position">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          format="yyyy-MM-dd"
                          inputVariant="outlined"
                          margin="normal"
                          className={classes.root}
                          id="date-picker-inline"
                          value={endDate}
                          onChange={(date: any) => {
                            let formattedDate = format(date, "yyyy-MM-dd");
                            setEndDate(formattedDate);
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      className="bt btn-containe"
                      onClick={() =>
                        getCSVdownload(
                          startDate.toString(),
                          endDate.toString(),
                          token
                        )
                      }
                      startIcon={<GetAppIcon />}
                    >
                      Export
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#919191",
        },
        "&:hover fieldset": {
          borderColor: "#919191",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#919191",
        },
      },
    },
  })
);

export default ExportResult;
