import { useState, FormEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import { LOGIN_ROUTE } from "src/constants";
import { logIn, register } from "src/store/actions";
import { ErrorsList, Loader } from "src/components";

import styles from "./AuthForm.module.css";

interface Props {
  type: "login" | "register";
}

const AuthForm: FC<Props> = ({ type }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const typeIsRegister = type === "register";

  const goToHomeRoute = () => {
    history.push("/");
  };

  const goToLoginRoute = () => {
    history.push(LOGIN_ROUTE);
  };

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
          setErrors,
          goToLoginRoute
        )
      );
    } else {
      dispatch(logIn(username, password, setLoading, setErrors, goToHomeRoute));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <Loader loading={loading} type="form" />
      <ErrorsList errors={errors} setErrors={setErrors} />
      <TextField
        required
        fullWidth
        autoFocus
        name="username"
        margin="normal"
        label="Username"
        variant="standard"
        autoComplete="login-username"
      />
      <TextField
        required
        fullWidth
        name="password"
        type="password"
        margin="normal"
        label="Password"
        variant="standard"
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
          variant="standard"
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
