import { useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import { ErrorsList, Loader } from "src/components";
import { changeRoomPassword } from "src/store/actions";

import styles from "./ChangeRoomPassword.module.css";

interface Props {
  roomId: string;
  chatRoute: string;
}

const ChangePasswordForm: FC<Props> = ({ roomId, chatRoute }) => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const goToChatRoute = () => {
    history.push(chatRoute);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      changeRoomPassword(
        roomId,
        password,
        newPassword,
        setLoading,
        setErrors,
        goToChatRoute
      )
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Loader loading={loading} type="form" />
      <ErrorsList errors={errors} setErrors={setErrors} />
      <TextField
        required
        fullWidth
        type="password"
        margin="normal"
        value={password}
        variant="standard"
        autoComplete="off"
        label="Current Password"
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      <TextField
        required
        fullWidth
        type="password"
        margin="normal"
        variant="standard"
        autoComplete="off"
        value={newPassword}
        label="New Password"
        onChange={(e) => setNewPassword(e.target.value.trim())}
      />
      <Button
        fullWidth
        type="submit"
        color="primary"
        disabled={loading}
        variant="contained"
        className={styles.submit_form_button}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
