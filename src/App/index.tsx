import { FC } from "react";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useDispatch } from "react-redux";

import { theme } from "src/styles";
import { socket } from "src/constants";
import { ChatContainer } from "src/containers";
import { addChatMessage } from "src/store/actions";

import useStyles from "./styles";

const App: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  socket.on("connect_error", (err) => {
    alert(`Connection error: ${err.message}`);
  });

  socket.on("connect", () => {
    const message = `${socket.id} joined`;
    socket.emit("message", message);
  });

  socket.on("message", (message: string) => {
    dispatch(addChatMessage(message));
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" className={styles.container}>
        <ChatContainer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
