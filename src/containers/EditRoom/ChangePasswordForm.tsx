import { useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@material-ui/core";

import { ErrorsList, Loader } from "src/components";
import { changeRoomPassword } from "src/store/actions";

import useStyles from "./styles";

interface Props {
  roomId: string;
  chatRoute: string;
}

const ChangePasswordForm: FC<Props> = ({ roomId, chatRoute }) => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const styles = useStyles();
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
      <Typography
        variant="h5"
        component="h3"
        color="primary"
        className={styles.form_heading}
      >
        Change Password
      </Typography>
      <Loader loading={loading} isFormLoader />
      <ErrorsList errors={errors} setErrors={setErrors} />
      <TextField
        required
        fullWidth
        type="password"
        margin="normal"
        value={password}
        autoComplete="off"
        label="Current Password"
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      <TextField
        required
        fullWidth
        type="password"
        margin="normal"
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
