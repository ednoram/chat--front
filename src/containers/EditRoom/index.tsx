import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@material-ui/core";

import { ROOMS_ROUTE } from "src/constants";
import { BackLink, HelmetLayout } from "src/components";
import { useAuthorize, useFetchRoom, useRestrictEditingRoom } from "src/hooks";

import useStyles from "./styles";

const EditRoom: FC = () => {
  const styles = useStyles();
  const { id: roomId }: { id: string } = useParams();

  const room = useFetchRoom(roomId);

  useAuthorize();
  useRestrictEditingRoom(room);

  const chatRoute = `${ROOMS_ROUTE}/${roomId}`;
  const deleteRoomRoute = `${ROOMS_ROUTE}/${roomId}/edit/delete-room`;
  const changePasswordRoute = `${ROOMS_ROUTE}/${roomId}/edit/change-password`;
  const deleteAllMessagesRoute = `${ROOMS_ROUTE}/${roomId}/edit/delete-all-messages`;

  const links = (
    <Box className={styles.links_container}>
      <Typography>
        <Link to={changePasswordRoute} className={styles.change_password_link}>
          Change Room Password
        </Link>
      </Typography>
      <Typography>
        <Link to={deleteAllMessagesRoute} className={styles.delete_link}>
          Delete All Messages
        </Link>
      </Typography>
      <Typography>
        <Link to={deleteRoomRoute} className={styles.delete_link}>
          Delete Room
        </Link>
      </Typography>
    </Box>
  );

  return (
    <HelmetLayout title="Edit Room" description="Edit Room page">
      <Container maxWidth="xs" className={styles.container}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Edit Room
        </Typography>
        <Typography variant="h6" component="h2" className={styles.room_name}>
          Room: {room?.name}
        </Typography>
        <Box className={styles.back_link_container}>
          <BackLink route={chatRoute} text="Chat" />
        </Box>
        {links}
      </Container>
    </HelmetLayout>
  );
};

export default EditRoom;
