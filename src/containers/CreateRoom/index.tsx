import { FC } from "react";
import { Box, Container, Typography } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { ROOMS_ROUTE } from "src/constants";
import { BackLink, HelmetLayout } from "src/components";

import Form from "./Form";
import useStyles from "./styles";

const CreateRoom: FC = () => {
  const styles = useStyles();

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
