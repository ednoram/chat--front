import { useState, FC, FormEvent } from "react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { IMessage } from "src/types";
import { postMessage } from "src/store/actions";
import { selectUserData } from "src/store/selectors";

import useStyles from "./styles";

interface Props {
  roomId: string;
}

const Form: FC<Props> = ({ roomId }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const user = useSelector(selectUserData);

  const styles = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (loading || !user || !inputValue.trim()) return;

    const message: IMessage = {
      roomId,
      _id: "",
      createdAt: new Date(),
      text: inputValue.trim(),
      username: user.username,
    };

    if (message.text && message.username) {
      dispatch(postMessage(message, setLoading));
      setInputValue("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box className={styles.form_div}>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          autoComplete="off"
          value={inputValue}
          inputProps={{ maxLength: 800 }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <LoadingButton
          type="submit"
          color="primary"
          loading={loading}
          variant="contained"
          aria-label="send message"
          disabled={loading || !inputValue}
        >
          <SendIcon aria-label="send icon" />
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Form;
