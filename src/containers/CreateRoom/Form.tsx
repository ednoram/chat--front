import { useState, FC, FormEvent } from "react";
import { nanoid } from "nanoid";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";
import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";

import { postChatRoom } from "src/store/actions";

import useStyles from "./styles";

const Form: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = String(data.get("name"));

    if (name.trim()) {
      dispatch(postChatRoom(name.trim(), setLoading, setErrors, history));
    }
  };

  const loadingDiv = loading && (
    <div className={styles.loading_div}>
      <CircularProgress color="primary" />
    </div>
  );

  const errorsList = errors.length > 0 && (
    <List className={styles.errors_list}>
      {errors.map((error) => (
        <ListItem key={nanoid()} className={styles.errors_list_item}>
          <ListItemText primary={error} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      {loadingDiv}
      {errorsList}
      <TextField
        required
        fullWidth
        autoFocus
        name="name"
        margin="normal"
        label="Room Name"
        autoComplete="off"
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
