import { FC } from "react";
import { Container, Typography } from "@mui/material";

import { HelmetLayout } from "src/components";

import styles from "./NotFound.module.css";

const NotFound: FC = () => {
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
