import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { AuthForm } from "src/components";
import { LOGIN_ROUTE } from "src/constants";

import useStyles from "./styles";

const Register: FC = () => {
  const styles = useStyles();

  useAuthorize({ reverse: true });

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Register
      </Typography>
      <AuthForm type="register" />
      <Typography className={styles.login_link_text}>
        Already have an account?{" "}
        <Link to={LOGIN_ROUTE} className={styles.login_link}>
          Log In
        </Link>
      </Typography>
    </Container>
  );
};

export default Register;
