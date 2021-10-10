import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import {
  ChatContainer,
  HomeContainer,
  LoginContainer,
  RegisterContainer,
  NotFoundContainer,
} from "src/containers";
import { theme } from "src/styles";
import { HelmetLayout } from "src/components";
import { addChatMessage, logInWithToken } from "src/store/actions";
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, socket } from "src/constants";

const App: FC = () => {
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

  useEffect(() => {
    dispatch(logInWithToken());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HelmetLayout title="Home" description="Home page">
              <HomeContainer />
            </HelmetLayout>
          </Route>
          <Route exact path={CHAT_ROUTE}>
            <HelmetLayout title="Chat" description="Chat page">
              <ChatContainer />
            </HelmetLayout>
          </Route>
          <Route exact path={LOGIN_ROUTE}>
            <HelmetLayout title="Log In" description="Login page">
              <LoginContainer />
            </HelmetLayout>
          </Route>
          <Route exact path={REGISTER_ROUTE}>
            <HelmetLayout title="Register" description="Register page">
              <RegisterContainer />
            </HelmetLayout>
          </Route>
          <Route>
            <HelmetLayout
              title="404: Page Not Found"
              description="Page not found"
            >
              <NotFoundContainer />
            </HelmetLayout>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
