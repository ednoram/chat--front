import { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, Link } from "react-router-dom";
import { Typography, Container, Box } from "@material-ui/core";

import { socket, ROOMS_ROUTE } from "src/constants";
import { selectUserData } from "src/store/selectors";
import { BackLink, HelmetLayout } from "src/components";
import { useAuthorize, useDisableBodyScroll, useFetchRoom } from "src/hooks";

import Form from "./Form";
import useStyles from "./styles";
import Messages from "./Messages";
import RoomPasswordForm from "./RoomPasswordForm";

const Chat: FC = () => {
  const [roomPassword, setRoomPassword] = useState<string | null>(null);

  const styles = useStyles();
  const user = useSelector(selectUserData);
  const { id: roomId }: { id: string } = useParams();

  const room = useFetchRoom(roomId);

  useAuthorize();
  useDisableBodyScroll(!roomPassword);

  useEffect(() => {
    if (roomId && roomPassword) {
      socket.emit("room", roomId, roomPassword);
    }
  }, [roomId, roomPassword]);

  const userIsAdmin = user && room?.adminId === user?._id;

  const roomNameDiv = room?.name && (
    <Typography
      variant="h6"
      component="h2"
      color="primary"
      className={styles.room_text}
    >
      Room: {room.name}
    </Typography>
  );

  const editRoomLink = userIsAdmin && (
    <Typography>
      <Link
        to={`${ROOMS_ROUTE}/${roomId}/edit`}
        className={styles.edit_room_link}
      >
        <EditIcon className={styles.edit_room_icon} />
        Edit
      </Link>
    </Typography>
  );

  const links = room && (
    <Box className={styles.links_container}>
      <BackLink route={ROOMS_ROUTE} text="Rooms" />
      {editRoomLink}
    </Box>
  );

  const chatDiv = room && (
    <div>
      <Messages roomId={roomId} roomPassword={roomPassword} />
      <Form roomId={roomId} />
    </div>
  );

  return (
    <HelmetLayout title="Chat" description="Chat page">
      {!roomPassword && (
        <RoomPasswordForm room={room} setRoomPassword={setRoomPassword} />
      )}
      <Container maxWidth="sm" className={styles.container}>
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Chat
        </Typography>
        {roomNameDiv}
        {userIsAdmin && (
          <Typography className={styles.admin_text}>
            (you are the admin)
          </Typography>
        )}
        {links}
        {chatDiv}
      </Container>
    </HelmetLayout>
  );
};

export default Chat;
