import {
  FC,
  useState,
  Dispatch,
  FormEvent,
  useEffect,
  SetStateAction,
} from "react";
import { nanoid } from "nanoid";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { Box, Button, Container, Typography } from "@material-ui/core";

import { IRoom } from "src/types";
import { BackLink } from "src/components";
import { ROOMS_ROUTE } from "src/constants";
import { fetchMessages } from "src/store/actions";

import useStyles from "./styles";

interface Props {
  room: IRoom | null;
  setRoomPassword: Dispatch<SetStateAction<string | null>>;
}

const RoomPasswordForm: FC<Props> = ({ room, setRoomPassword }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setRoomPassword(inputValue);
    }
  }, [success]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (room?._id) {
      dispatch(
        fetchMessages(room._id, inputValue, setLoading, setSuccess, setErrors)
      );
    }
  };

  const roomName = room && (
    <Typography
      variant="h5"
      component="p"
      className={styles.room_password_name}
    >
      {room.name}
    </Typography>
  );

  const errorsDiv = errors.map((error) => (
    <Box key={nanoid()}>
      <Typography color="secondary" className={styles.room_password_error}>
        {error}
      </Typography>
    </Box>
  ));

  return (
    <Box className={styles.room_password_container}>
      <Container
        maxWidth="xs"
        component="form"
        onSubmit={handleSubmit}
        className={styles.room_password_form}
      >
        <BackLink route={ROOMS_ROUTE} text="Rooms" />
        {roomName}
        <TextField
          required
          fullWidth
          autoFocus
          margin="normal"
          type="password"
          label="Password"
          variant="outlined"
          autoComplete="off"
          value={inputValue}
          inputProps={{ maxLength: 100 }}
          onChange={(e) => !loading && setInputValue(e.target.value.trim())}
        />
        {errorsDiv}
        <Button
          type="submit"
          color="primary"
          disabled={loading}
          variant="contained"
          className={styles.room_password_submit}
        >
          Submit
        </Button>
      </Container>
    </Box>
  );
};

export default RoomPasswordForm;
