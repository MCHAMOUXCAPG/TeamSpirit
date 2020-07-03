import React from "react";
import "./ExportResult.css";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(10),
      },
    },
    input: {
      borderRadius: 28,
      position: "relative",
      width: 150,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #919191",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      // Use the system font instead of the default Roboto font.
      fontFamily: ["Roboto"].join(","),
      "&:focus": {
        borderRadius: 20,
        borderColor: "#79C0C6",
        boxShadow: "#79C0C6",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
      top: -18,
    },
  })
);

function ExportResult() {
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
                  <Grid item xs={3} className="text">
                    <FormControl className={classes.margin}>
                      <NativeSelect
                        id="demo-customized-select-native"
                        //value={age}
                        //onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Sprint1</option>
                        <option value={20}>Sprint2</option>
                        <option value={30}>Sprint3</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <p className="text" id="p-position">
                      To:
                    </p>
                  </Grid>
                  <Grid item xs={3} className="text">
                    <FormControl className={classes.margin}>
                      <NativeSelect
                        id="demo-customized-select-native"
                        //value={age}
                        //onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Sprint1</option>
                        <option value={20}>Sprint2</option>
                        <option value={30}>Sprint3</option>
                      </NativeSelect>
                    </FormControl>
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

export default ExportResult;
