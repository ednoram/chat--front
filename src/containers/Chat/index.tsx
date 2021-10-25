import { useState, useEffect, FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container, Box } from "@material-ui/core";
import { useParams, useHistory, Link } from "react-router-dom";

import { IRoom } from "src/types";
import { socket, ROOMS_ROUTE } from "src/constants";
import { selectUserData } from "src/store/selectors";
import { useAuthorize, useDisableBodyScroll } from "src/hooks";
import { BackLink, HelmetLayout, Loader } from "src/components";
import { getChatRoom, setChatMessages } from "src/store/actions";

import Form from "./Form";
import useStyles from "./styles";
import Messages from "./Messages";
import RoomPasswordForm from "./RoomPasswordForm";

const Chat: FC = () => {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [roomPassword, setRoomPassword] = useState<string | null>(null);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const { id: roomId }: { id: string } = useParams();

  useAuthorize();
  useDisableBodyScroll(!roomPassword);

  useEffect(() => {
    dispatch(setChatMessages([]));

    const fetchRoom = async () => {
      const chatRoom = await getChatRoom(roomId);

      if (!chatRoom) {
        history.push(ROOMS_ROUTE);
      } else {
        setRoom(chatRoom);
      }
    };

    fetchRoom();
  }, []);

  useEffect(() => {
    if (roomId && roomPassword) {
      socket.emit("room", roomId, roomPassword);
    }
  }, [roomId, roomPassword]);

  const loading = !room?.name;
  const userIsAdmin = user && room?.adminId === user?._id;

  const roomNameDiv = (
    <Typography
      variant="h6"
      component="h2"
      color="primary"
      className={styles.room_text}
    >
      Room: {room?.name}
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

  const chatDiv = !loading ? (
    <div>
      <Messages />
      <Form roomId={roomId} />
    </div>
  ) : (
    <Loader loading={true} />
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
        {!loading && roomNameDiv}
        {userIsAdmin && (
          <Typography className={styles.admin_text}>
            (you are the admin)
          </Typography>
        )}
        <Box className={styles.links_container}>
          <BackLink route={ROOMS_ROUTE} text="Rooms" />
          {editRoomLink}
        </Box>
        {chatDiv}
      </Container>
    </HelmetLayout>
  );
};

export default Chat;
