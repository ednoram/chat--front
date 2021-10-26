import { useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@material-ui/core";

import { ErrorsList, Loader } from "src/components";
import { changeUserPassword } from "src/store/actions";

import useStyles from "./styles";

const Form: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const goToHomeRoute = () => {
    history.push("/");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      changeUserPassword(
        currentPassword,
        newPassword,
        passwordConfirmation,
        setLoading,
        setErrors,
        goToHomeRoute
      )
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        component="h3"
        color="primary"
        className={styles.form_heading}
      >
        Change Password
      </Typography>
      <Loader loading={loading} type="form" />
      <ErrorsList errors={errors} setErrors={setErrors} />
      <TextField
        required
        fullWidth
        autoFocus
        type="password"
        margin="normal"
        value={currentPassword}
        autoComplete="off"
        label="Current Password"
        onChange={(e) => setCurrentPassword(e.target.value.trim())}
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
      <TextField
        required
        fullWidth
        type="password"
        margin="normal"
        autoComplete="off"
        value={passwordConfirmation}
        label="Confirm New Password"
        onChange={(e) => setPasswordConfirmation(e.target.value.trim())}
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

export default Form;
