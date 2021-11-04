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
  RoomContainer,
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
import {
  removeMessage,
  addChatMessage,
  logInWithToken,
} from "src/store/actions";
import { IMessage } from "src/types";
import { theme, useGlobalStyles } from "src/styles";

const App: FC = () => {
  useGlobalStyles();

  const dispatch = useDispatch();

  socket.on("connect_error", (err) => {
    alert(`Connection error: ${err.message}`);
  });

  socket.on("message", (message: IMessage) => {
    dispatch(addChatMessage(message));
  });

  socket.on("delete-message", (message: IMessage) => {
    dispatch(removeMessage(message._id));
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
          <Route exact path={`${ROOMS_ROUTE}/:id`} component={RoomContainer} />
          <Route component={NotFoundContainer} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
