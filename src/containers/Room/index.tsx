import { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, Link } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";

import { emitRoom } from "src/utils";
import { ROOMS_ROUTE } from "src/constants";
import { selectUserData } from "src/store/selectors";
import { BackLink, HelmetLayout } from "src/components";
import { useAuthorize, useDisableBodyScroll, useFetchRoom } from "src/hooks";

import Form from "./Form";
import Messages from "./Messages";
import styles from "./Room.module.css";
import RoomPasswordForm from "./RoomPasswordForm";

const Room: FC = () => {
  const [roomPassword, setRoomPassword] = useState<string | null>(null);

  const user = useSelector(selectUserData);
  const { id: roomId }: { id: string } = useParams();

  const room = useFetchRoom(roomId);

  useAuthorize();
  useDisableBodyScroll(!roomPassword);

  useEffect(() => {
    if (roomId && roomPassword) {
      emitRoom(roomId, roomPassword);
    }
  }, [roomId, roomPassword]);

  const userIsAdmin = user && room?.adminId === user?._id;

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
    <HelmetLayout description="Room page" title={`${room ? room.name : ""}`}>
      <Container maxWidth="sm" className={styles.container}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Room
        </Typography>
        <Typography variant="h6" component="h2" className={styles.room_name}>
          {room?.name}
        </Typography>
        {userIsAdmin && (
          <Typography className={styles.admin_text}>
            (you are the admin)
          </Typography>
        )}
        {links}
        {chatDiv}
        {!roomPassword && (
          <RoomPasswordForm room={room} setRoomPassword={setRoomPassword} />
        )}
      </Container>
    </HelmetLayout>
  );
};

export default Room;
