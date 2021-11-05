import { useState, useEffect, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import { deleteRoom } from "src/store/actions";
import { ErrorsList, ConfirmationDialog, Loader } from "src/components";

import styles from "./DeleteRoom.module.css";

interface Props {
  roomId: string;
  chatRoute: string;
}

const Form: FC<Props> = ({ roomId, chatRoute }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [roomPassword, setRoomPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (confirmed && !loading) {
      dispatch(
        deleteRoom(roomId, roomPassword, setLoading, setErrors, goToChatRoute)
      );
    }
  }, [confirmed]);

  useEffect(() => {
    if (errors.length > 0) {
      setConfirmed(false);
    }
  }, [errors]);

  const goToChatRoute = () => {
    history.push(chatRoute);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!confirmed) {
      setDialogIsOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Loader loading={loading} type="form" />
      <ErrorsList errors={errors} setErrors={setErrors} />
      <ConfirmationDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        setConfirmed={setConfirmed}
        title="Are you sure you want to delete this room?"
        contentText="Clicking 'Yes' will permanently delete this room. This action can not be undone."
      />
      <TextField
        required
        fullWidth
        type="password"
        margin="normal"
        label="Password"
        variant="standard"
        autoComplete="off"
        value={roomPassword}
        onChange={(e) => setRoomPassword(e.target.value.trim())}
      />
      <Button
        fullWidth
        type="submit"
        color="secondary"
        disabled={loading}
        variant="contained"
        className={styles.submit_form_button}
      >
        Delete Room
      </Button>
    </Box>
  );
};

export default Form;
