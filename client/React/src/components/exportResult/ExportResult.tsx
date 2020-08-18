import React, { useState } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CircularProgress,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SurveyService } from "../../services/Services";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import FileSaver from "file-saver";
import colors from "../../config/colors";
import "./ExportResult.css";

function ExportResult({ teamName }: { teamName: string }) {
  const [startDate, setStartDate] = useState<Date | string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [endDate, setEndDate] = useState<Date | string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [message, setMessage] = useState(
    "Please, select a date interval and export your CSV."
  );

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#919191");
  const [latent, setLatent] = useState(false);
  const classes = useStyles();
  const token = sessionStorage.getItem("token");

  const surveyService: SurveyService = new SurveyService();

  // Function to get the date range of data to download into a CSV.
  const getCSVdownload = async (
    startDate: string,
    endDate: string,
    token: string | null
  ) => {
    await surveyService
      .getCSV(startDate, endDate, teamName, token)
      .then((res) => {
        if (res.data !== "") {
          const csvData = new Blob([res.data], {
            type: "text/csv;charset=utf-8;",
          });
          FileSaver.saveAs(csvData, teamName + startDate + endDate + ".csv");
          setMessage("File successfully donwloaded.");
          setColor("#9BC183");
          setLatent(true);
          setTimeout(() => {
            setMessage("Please, select a date interval and export your CSV.");
            setColor("#919191");
            setLatent(false);
          }, 5000);
        } else {
          setMessage(
            "No data for this date interval. Please, choose another date."
          );
          setColor("#f0c12d");
        }
        setLoading(false);
      })
      .catch((err) => {
        setMessage("Network Error. Please, try again later.");
        setColor("#FE5454");
        setLoading(false);
      });
  };

  return (
    <div ref={React.createRef()}>
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
          {loading && (
            <CircularProgress
              size={24}
              style={{
                color: colors.primary,
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
            />
          )}
          <div style={{ opacity: loading ? 0.5 : 1 }}>
            <p
              className={latent ? "info-text latent" : "info-text"}
              style={{ color: color }}
            >
              {message}
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
                          id="date-picker-inline-2"
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
                      style={{ position: "relative", top: -10 }}
                      variant="outlined"
                      className="bt btn-containe"
                      onClick={() => {
                        setLoading(true);
                        getCSVdownload(
                          startDate.toString(),
                          endDate.toString(),
                          token
                        );
                      }}
                      startIcon={<GetAppIcon />}
                    >
                      Export
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
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
