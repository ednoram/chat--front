import { useState, FC, FormEvent } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";

import { postChatRoom } from "src/store/actions";
import { ErrorsList, Loader } from "src/components";

import useStyles from "./styles";

const Form: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState("");

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = String(data.get("name"));
    const password = String(data.get("password"));

    if (name.trim()) {
      dispatch(
        postChatRoom(name.trim(), password, setLoading, setErrors, history)
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <Loader loading={loading} isFormLoader />
      <ErrorsList errors={errors} setErrors={setErrors} />
      <TextField
        required
        fullWidth
        autoFocus
        name="name"
        margin="normal"
        label="Room Name"
        autoComplete="off"
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        required
        fullWidth
        margin="normal"
        type="password"
        name="password"
        autoComplete="off"
        label="Room Password"
        value={passwordValue}
        inputProps={{ maxLength: 100 }}
        onChange={(e) => setPasswordValue(e.target.value.trim())}
      />
      <Button
        type="submit"
        color="primary"
        disabled={loading}
        variant="contained"
        className={styles.submit_button}
      >
        Create Room
      </Button>
    </Box>
  );
};

export default Form;
