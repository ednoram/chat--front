import { useState, useEffect, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField } from "@material-ui/core";

import { deleteRoomMessages } from "src/store/actions";
import { ErrorsList, ConfirmationDialog } from "src/components";

import useStyles from "./styles";

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

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (confirmed && !loading) {
      dispatch(
        deleteRoomMessages(
          roomId,
          roomPassword,
          setLoading,
          setErrors,
          goToChatRoute
        )
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
      <ErrorsList errors={errors} setErrors={setErrors} />
      <ConfirmationDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        setConfirmed={setConfirmed}
        title="Are you sure you want to delete all messages?"
        contentText="Clicking 'Yes' will delete all messages of this room. This action can not be undone."
      />
      <TextField
        required
        fullWidth
        autoFocus
        type="password"
        margin="normal"
        label="Password"
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
        className={styles.delete_messages_button}
      >
        Delete All Messages
      </Button>
    </Box>
  );
};

export default Form;
