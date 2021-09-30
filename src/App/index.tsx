import { FC } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { Container, Typography } from "@material-ui/core";

import { theme } from "src/styles";
import { Chat } from "src/components";
import { socket } from "src/constants";
import { addMessage } from "src/store/actions";

import useStyles from "./styles";

socket.on("connect_error", (err) => {
  alert(`Connection error: ${err.message}`);
});

const App: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  socket.on("connect", () => {
    const message = `${socket.id} joined`;
    socket.emit("message", message);
  });

  socket.on("message", (message: string) => {
    dispatch(addMessage(message));
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className={styles.container}>
        <Typography
          variant="h2"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Chat
        </Typography>
        <Chat />
      </Container>
    </ThemeProvider>
  );
};

export default App;
