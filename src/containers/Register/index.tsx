import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography, Container } from "@mui/material";

import { useAuthorize } from "src/hooks";
import { LOGIN_ROUTE } from "src/constants";
import { AuthForm, HelmetLayout } from "src/components";

import styles from "./Register.module.css";

const Register: FC = () => {
  useAuthorize({ reverse: true });

  return (
    <HelmetLayout title="Register" description="Register page">
      <Container maxWidth="xs" className={styles.container}>
        <Typography
          variant="h4"
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
    </HelmetLayout>
  );
};

export default Register;
