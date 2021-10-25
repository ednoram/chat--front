import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button, Box } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { logOut } from "src/store/actions";
import { selectUserData } from "src/store/selectors";
import { HelmetLayout, Loader } from "src/components";
import { ACCOUNT_ROUTE, LOGIN_ROUTE, ROOMS_ROUTE } from "src/constants";

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

  const content = user ? (
    <Box className={styles.content}>
      <Typography variant="h4" component="p" color="primary">
        <Link
          to={ACCOUNT_ROUTE}
          aria-label="account page"
          className={styles.account_link}
        >
          {user?.username}
        </Link>
      </Typography>
      <Typography variant="h5" component="p">
        <Link to={ROOMS_ROUTE} className={styles.rooms_link}>
          Rooms
        </Link>
      </Typography>
      <Box>
        <Button color="secondary" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    </Box>
  ) : (
    <Loader loading={true} />
  );

  return (
    <HelmetLayout title="Home" description="Home page">
      <Container maxWidth="md" className={styles.container}>
        <Typography
          variant="h2"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Chat App
        </Typography>
        {content}
      </Container>
    </HelmetLayout>
  );
};

export default Home;
