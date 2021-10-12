import { useState, FC, FormEvent } from "react";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, Button } from "@material-ui/core";

import { IMessage } from "src/types";
import { socket } from "src/constants";
import { selectChatRoom, selectUserData } from "src/store/selectors";

import useStyles from "./styles";

const Form: FC = () => {
  const [inputValue, setInputValue] = useState("");

  const styles = useStyles();
  const user = useSelector(selectUserData);
  const chatRoom = useSelector(selectChatRoom);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!user) return;

    const { username, _id } = user;

    const message: IMessage = {
      date: new Date(),
      user: { username, _id },
      text: inputValue.trim(),
    };

    if (message.text && message.user.username) {
      socket.emit("message", message, chatRoom);
      setInputValue("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box className={styles.form_div}>
        <TextField
          required
          fullWidth
          label="Message"
          variant="outlined"
          autoComplete="off"
          value={inputValue}
          id="outlined-basic"
          inputProps={{ maxLength: 800 }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          aria-label="send message"
        >
          <SendIcon aria-label="send icon" />
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
