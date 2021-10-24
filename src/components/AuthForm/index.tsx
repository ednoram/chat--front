import { useState, FormEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";
import { CircularProgress } from "@mui/material";

import { ErrorsList } from "src/components";
import { logIn, register } from "src/store/actions";

import useStyles from "./styles";

interface Props {
  type: "login" | "register";
}

const AuthForm: FC<Props> = ({ type }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState("");

  const styles = useStyles();
  const dispatch = useDispatch();

  const typeIsRegister = type === "register";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    const data = new FormData(event.currentTarget);

    const username = String(data.get("username"));
    const password = String(data.get("password"));
    const passwordConfirmation = String(data.get("password-confirmation"));

    if (typeIsRegister) {
      dispatch(
        register(
          username,
          password,
          passwordConfirmation,
          setLoading,
          setErrors
        )
      );
    } else {
      dispatch(logIn(username, password, setLoading, setErrors));
    }
  };

  const loadingDiv = loading && (
    <div className={styles.loading_div}>
      <CircularProgress color="primary" />
    </div>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      {loadingDiv}
      <ErrorsList errors={errors} setErrors={setErrors} />
      <TextField
        required
        fullWidth
        autoFocus
        name="username"
        margin="normal"
        label="Username"
        autoComplete="login-username"
      />
      <TextField
        required
        fullWidth
        name="password"
        type="password"
        margin="normal"
        label="Password"
        autoComplete="off"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value.trim())}
      />
      {typeIsRegister && (
        <TextField
          required
          fullWidth
          type="password"
          margin="normal"
          autoComplete="off"
          label="Confirm Password"
          name="password-confirmation"
        />
      )}
      <Button
        fullWidth
        type="submit"
        color="primary"
        disabled={loading}
        variant="contained"
        className={styles.submit_button}
      >
        {typeIsRegister ? "Register" : "Log In"}
      </Button>
    </Box>
  );
};

export default AuthForm;
