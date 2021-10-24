import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import {
  socket,
  ROOMS_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CREATE_ROOM_ROUTE,
} from "src/constants";
import {
  ChatContainer,
  HomeContainer,
  LoginContainer,
  RoomsContainer,
  RegisterContainer,
  NotFoundContainer,
  EditRoomContainer,
  CreateRoomContainer,
} from "src/containers";
import { theme } from "src/styles";
import { IMessage } from "src/types";
import { addChatMessage, logInWithToken } from "src/store/actions";

const App: FC = () => {
  const dispatch = useDispatch();

  socket.on("connect_error", (err) => {
    alert(`Connection error: ${err.message}`);
  });

  socket.on("message", (message: IMessage) => {
    dispatch(addChatMessage(message));
  });

  useEffect(() => {
    dispatch(logInWithToken());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path={`${ROOMS_ROUTE}/:id/edit`}
            component={EditRoomContainer}
          />
          <Route
            exact
            path={CREATE_ROOM_ROUTE}
            component={CreateRoomContainer}
          />
          <Route exact path="/" component={HomeContainer} />
          <Route exact path={ROOMS_ROUTE} component={RoomsContainer} />
          <Route exact path={LOGIN_ROUTE} component={LoginContainer} />
          <Route exact path={REGISTER_ROUTE} component={RegisterContainer} />
          <Route exact path={`${ROOMS_ROUTE}/:id`} component={ChatContainer} />
          <Route component={NotFoundContainer} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
