import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { REGISTER_ROUTE } from "src/constants";
import { AuthForm, HelmetLayout } from "src/components";

import useStyles from "./styles";

const Login: FC = () => {
  const styles = useStyles();

  useAuthorize({ reverse: true });

  return (
    <HelmetLayout title="Log In" description="Login page">
      <Container maxWidth="xs" className={styles.container}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Log In
        </Typography>
        <AuthForm type="login" />
        <Typography className={styles.register_link_text}>
          Don&apos;t have an account?{" "}
          <Link to={REGISTER_ROUTE} className={styles.register_link}>
            Register
          </Link>
        </Typography>
      </Container>
    </HelmetLayout>
  );
};

export default Login;
