import { FC } from "react";
import { Box, Container, Typography } from "@mui/material";

import { useAuthorize } from "src/hooks";
import { ROOMS_ROUTE } from "src/constants";
import { BackLink, HelmetLayout } from "src/components";

import Form from "./Form";
import styles from "./CreateRoom.module.css";

const CreateRoom: FC = () => {
  useAuthorize();

  return (
    <HelmetLayout title="Create Room" description="Create room page">
      <Container maxWidth="xs" className={styles.container}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Create Room
        </Typography>
        <Box className={styles.rooms_link_container}>
          <BackLink route={ROOMS_ROUTE} text="Rooms" />
        </Box>
        <Form />
      </Container>
    </HelmetLayout>
  );
};

export default CreateRoom;
