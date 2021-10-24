import { FC } from "react";
import { Container, Typography } from "@material-ui/core";

import { HelmetLayout } from "src/components";

import useStyles from "./styles";

const NotFound: FC = () => {
  const styles = useStyles();

  return (
    <HelmetLayout title="404 | Page Not Found" description="Page not found">
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
    </HelmetLayout>
  );
};

export default NotFound;
