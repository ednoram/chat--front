import { useState, ReactElement, FormEvent } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";

import { socket } from "src/constants";
import { selectChatRoom } from "src/store/selectors";

import useStyles from "./styles";

const Form = (): ReactElement => {
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
    <form onSubmit={handleSubmit}>
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Send
        </Button>
      </Box>
    </form>
  );
};

export default Form;
