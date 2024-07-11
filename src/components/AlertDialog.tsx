import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface AlertDialogProps {
  open: boolean;
  close: (ok: boolean) => void;
  title?: string;
  children?: React.ReactNode;
}

export const AlertDialog = ({
  open,
  close,
  title,
  children,
}: AlertDialogProps) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => close(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title !== undefined && (
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        )}
        {children !== undefined && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {children}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => close(false)} variant="outlined">
            いいえ
          </Button>
          <Button onClick={() => close(true)} autoFocus variant="contained">
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
