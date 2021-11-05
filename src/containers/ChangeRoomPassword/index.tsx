import { FC } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

import { BackLink } from "src/components";
import { ROOMS_ROUTE } from "src/constants";
import { useFetchRoom, useAuthorize, useRestrictEditingRoom } from "src/hooks";

import Form from "./Form";
import styles from "./ChangeRoomPassword.module.css";

const ChangeRoomPassword: FC = () => {
  const { id: roomId }: { id: string } = useParams();

  const room = useFetchRoom(roomId);

  useAuthorize();
  useRestrictEditingRoom(room);

  const chatRoute = `${ROOMS_ROUTE}/${roomId}`;

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Typography
        variant="h4"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Change Room Password
      </Typography>
      <Typography variant="h6" component="h2" className={styles.room_name}>
        Room: {room?.name}
      </Typography>
      <Box className={styles.back_link_container}>
        <BackLink text="Cancel" route={`${chatRoute}/edit`} />
      </Box>
      <Form roomId={roomId} chatRoute={chatRoute} />
    </Container>
  );
};

export default ChangeRoomPassword;
