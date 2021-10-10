import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { logOut } from "src/store/actions/user";
import { selectUserData } from "src/store/selectors";
import { CHAT_ROUTE, LOGIN_ROUTE } from "src/constants";

const Home: FC = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  useAuthorize();

  const handleLogout = () => {
    dispatch(logOut());
    location.href = LOGIN_ROUTE;
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" color="primary">
        Home Page
      </Typography>
      <Typography>Username: {user?.username}</Typography>
      <div>
        <Link to={CHAT_ROUTE}>Chat</Link>
      </div>
      <Button onClick={handleLogout}>Log Out</Button>
    </Container>
  );
};

export default Home;
