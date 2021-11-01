import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Container, List, ListItem } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { HelmetLayout } from "src/components";
import { selectUserData } from "src/store/selectors";
import { ACCOUNT_ROUTE, ROOMS_ROUTE } from "src/constants";
import { ReactComponent as Logo } from "src/assets/logo.svg";

import useStyles from "./styles";

const Home: FC = () => {
  const styles = useStyles();
  const user = useSelector(selectUserData);

  useAuthorize();

  const linksList = (
    <List className={styles.links_list}>
      <ListItem className={styles.links_list_item}>
        <Typography variant="h5" component="p">
          <Link to={ROOMS_ROUTE} className={styles.link}>
            Rooms
          </Link>
        </Typography>
      </ListItem>
      <ListItem className={styles.links_list_item}>
        <Typography variant="h5" component="p">
          <Link
            to={ACCOUNT_ROUTE}
            aria-label="account page"
            className={styles.link}
          >
            Account
          </Link>
        </Typography>
      </ListItem>
    </List>
  );

  return (
    <HelmetLayout title="Home" description="Home page">
      <Container maxWidth="sm" className={styles.container}>
        <div className={styles.logo_and_title}>
          <Logo className={styles.logo} />
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            className={styles.title}
          >
            Chat
          </Typography>
        </div>
        <Typography
          variant="h4"
          component="h2"
          color="primary"
          className={styles.username_text}
        >
          {user?.username}
        </Typography>
        {linksList}
      </Container>
    </HelmetLayout>
  );
};

export default Home;
