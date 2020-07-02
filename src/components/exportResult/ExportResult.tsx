import React from "react";
import "./ExportResult.css";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
            <p>
              From:
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className="form-control">Sprint1</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="prueba"
                  //value={}
                  //onChange={}
                  label="Sprint"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default ExportResult;
