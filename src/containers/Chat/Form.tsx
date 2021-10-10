import { useState, FC, FormEvent } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";

import { socket } from "src/constants";
import { selectChatRoom } from "src/store/selectors";

import useStyles from "./styles";

const Form: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const styles = useStyles();

  const chatRoom = useSelector(selectChatRoom);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const message = inputValue.trim();

    if (message) {
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
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
