import {
  FC,
  useState,
  Dispatch,
  FormEvent,
  useEffect,
  SetStateAction,
} from "react";
import {
  Box,
  Button,
  Backdrop,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import { IRoom } from "src/types";
import { ROOMS_ROUTE } from "src/constants";
import { fetchMessages } from "src/store/actions";
import { BackLink, Loader } from "src/components";
import { selectChatMessagesData } from "src/store/selectors";

import styles from "./Room.module.css";

interface Props {
  room: IRoom | null;
  setRoomPassword: Dispatch<SetStateAction<string | null>>;
}

const RoomPasswordForm: FC<Props> = ({ room, setRoomPassword }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch();

  const { limit, offset } = useSelector(selectChatMessagesData);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setRoomPassword(inputValue);
      });

      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (room?._id) {
      dispatch(
        fetchMessages(
          room._id,
          inputValue,
          offset,
          limit,
          setLoading,
          setErrors,
          setSuccess
        )
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

  const content = !room ? (
    <Loader loading={true} className={styles.room_password_form_loader} />
  ) : (
    <>
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
    </>
  );

  return (
    <Backdrop open={!success} className={styles.room_password_backdrop}>
      <Container
        maxWidth="xs"
        component="form"
        onSubmit={handleSubmit}
        className={styles.room_password_form}
      >
        <BackLink route={ROOMS_ROUTE} text="Rooms" />
        {content}
      </Container>
    </Backdrop>
  );
};

export default RoomPasswordForm;
