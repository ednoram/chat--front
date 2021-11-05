import { FC } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Typography } from "@mui/material";

import { logOut } from "src/store/actions";
import { selectUserData } from "src/store/selectors";
import { HelmetLayout, BackLink, Loader } from "src/components";
import { EDIT_ACCOUNT_ROUTE, LOGIN_ROUTE } from "src/constants";

import styles from "./Account.module.css";

const Account: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const handleLogout = () => {
    dispatch(logOut());
    location.href = LOGIN_ROUTE;
  };

  const userInfo = user ? (
    <div className={styles.user_info}>
      <Typography variant="h6" component="p">
        Username: {user.username}
      </Typography>
    </div>
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
          variant="h4"
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
