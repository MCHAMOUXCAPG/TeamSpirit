import React, { useState } from "react";
import "./ExportResult.css";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

function ExportResult() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const classes = useStyles();

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
                          format="yyyy/MM/dd"
                          inputVariant="outlined"
                          margin="normal"
                          className={classes.root}
                          id="date-picker-inline"
                          value={startDate}
                          onChange={(date: any) => setStartDate(date)}
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
                          format="MM/dd/yyyy"
                          inputVariant="outlined"
                          margin="normal"
                          className={classes.root}
                          id="date-picker-inline"
                          value={endDate}
                          onChange={(date: any) => setEndDate(date)}
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
