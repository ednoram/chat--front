import { FC } from "react";
import { Container, Typography } from "@material-ui/core";

import useStyles from "./styles";

const NotFound: FC = () => {
  const styles = useStyles();

  return (
    <Container maxWidth="xs" className={styles.container}>
      <div>
        <Typography color="primary" variant="h1">
          404
        </Typography>
        <Typography variant="h5" component="p">
          Page not found
        </Typography>
      </div>
    </Container>
  );
};

export default NotFound;
