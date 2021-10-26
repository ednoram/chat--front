import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import {
  socket,
  ROOMS_ROUTE,
  LOGIN_ROUTE,
  ACCOUNT_ROUTE,
  REGISTER_ROUTE,
  CREATE_ROOM_ROUTE,
  EDIT_ACCOUNT_ROUTE,
} from "src/constants";
import {
  ChatContainer,
  HomeContainer,
  LoginContainer,
  RoomsContainer,
  AccountContainer,
  RegisterContainer,
  NotFoundContainer,
  EditRoomContainer,
  CreateRoomContainer,
  DeleteRoomContainer,
  EditAccountContainer,
  DeleteAllMessagesContainer,
  ChangeRoomPasswordContainer,
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
            path={CREATE_ROOM_ROUTE}
            component={CreateRoomContainer}
          />
          <Route
            exact
            path={EDIT_ACCOUNT_ROUTE}
            component={EditAccountContainer}
          />
          <Route
            exact
            path={`${ROOMS_ROUTE}/:id/edit`}
            component={EditRoomContainer}
          />
          <Route
            exact
            component={DeleteRoomContainer}
            path={`${ROOMS_ROUTE}/:id/edit/delete-room`}
          />
          <Route
            exact
            component={ChangeRoomPasswordContainer}
            path={`${ROOMS_ROUTE}/:id/edit/change-password`}
          />
          <Route
            exact
            component={DeleteAllMessagesContainer}
            path={`${ROOMS_ROUTE}/:id/edit/delete-all-messages`}
          />
          <Route exact path="/" component={HomeContainer} />
          <Route exact path={ROOMS_ROUTE} component={RoomsContainer} />
          <Route exact path={LOGIN_ROUTE} component={LoginContainer} />
          <Route exact path={ACCOUNT_ROUTE} component={AccountContainer} />
          <Route exact path={REGISTER_ROUTE} component={RegisterContainer} />
          <Route exact path={`${ROOMS_ROUTE}/:id`} component={ChatContainer} />
          <Route component={NotFoundContainer} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
