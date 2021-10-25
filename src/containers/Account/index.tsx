import { FC } from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Typography } from "@material-ui/core";

import { logOut } from "src/store/actions";
import { selectUserData } from "src/store/selectors";
import { HelmetLayout, BackLink, Loader } from "src/components";
import { EDIT_ACCOUNT_ROUTE, LOGIN_ROUTE } from "src/constants";

import useStyles from "./styles";

const Account: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const handleLogout = () => {
    dispatch(logOut());
    location.href = LOGIN_ROUTE;
  };

  const userInfo = user ? (
    <Stack spacing={2} className={styles.user_info}>
      <Typography variant="h5" component="p">
        Username: {user.username}
      </Typography>
      <Typography variant="h5" component="p">
        ID: {user._id}
      </Typography>
    </Stack>
  ) : (
    <Loader loading={true} />
  );

  const logoutButton = user && (
    <Box className={styles.logout_button_container}>
      <Button
        color="secondary"
        onClick={handleLogout}
        className={styles.logout_button}
      >
        Log Out
      </Button>
    </Box>
  );

  return (
    <HelmetLayout title="Account" description="Account page">
      <Container maxWidth="sm" className={styles.container}>
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Account
        </Typography>
        <Box className={styles.links_div}>
          <BackLink route="/" text="Home" />
          <Typography color="primary">
            <Link to={EDIT_ACCOUNT_ROUTE} className={styles.edit_link}>
              <EditIcon className={styles.edit_link_icon} />
              Edit
            </Link>
          </Typography>
        </Box>
        {userInfo}
        {logoutButton}
      </Container>
    </HelmetLayout>
  );
};

export default Account;
