import { FC, SetStateAction, Dispatch } from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface Props {
  title: string;
  isOpen: boolean;
  contentText: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmed: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationDialog: FC<Props> = ({
  title,
  isOpen,
  setIsOpen,
  contentText,
  setConfirmed,
}) => {
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          No
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
