import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button, Box } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { logOut } from "src/store/actions/user";
import { selectUserData } from "src/store/selectors";
import { LOGIN_ROUTE, ROOMS_ROUTE } from "src/constants";

import useStyles from "./styles";

const Home: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  useAuthorize();

  const handleLogout = () => {
    dispatch(logOut());
    location.href = LOGIN_ROUTE;
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Chat App
      </Typography>
      <Box className={styles.content}>
        <Typography variant="h4" component="p" color="primary">
          {user?.username}
        </Typography>
        <Box>
          <Typography variant="h5" component="p">
            <Link to={ROOMS_ROUTE} className={styles.rooms_link}>
              Rooms
            </Link>
          </Typography>
        </Box>
        <Box>
          <Button onClick={handleLogout}>Log Out</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
