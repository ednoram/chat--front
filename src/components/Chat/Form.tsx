import { useState, ReactElement, FormEvent } from "react";
import { Box, TextField, Button } from "@material-ui/core";

import { socket } from "src/constants";

import useStyles from "./styles";

const Form = (): ReactElement => {
  const [inputValue, setInputValue] = useState("");
  const styles = useStyles();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const message = inputValue.trim();

    if (message) {
      socket.emit("message", message);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.input_and_button}>
        <TextField
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
