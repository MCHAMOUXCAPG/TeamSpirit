import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import colors from "../../config/colors";
import "./AlertDialog.css";

export default function AlertDialog(props: any) {
  const [open, setOpen] = useState(true); //On false for testing purposes

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleClose}
      BackdropProps={{ style: { backgroundColor: colors.white, opacity: 0.7 } }}
      PaperProps={{
        style: {
          borderRadius: 20,
        },
      }}
    >
      <DialogContent
        style={{
          color: colors.primary,
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
          width: 250,
          height: 140,
        }}
      >
        <p>{props.text1}</p>
        <p>{props.text2}</p>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "center",
          paddingBottom: 30,
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: 20,
            width: 60,
          }}
          onClick={props.clicked === "" ? handleClose : props.clicked}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
