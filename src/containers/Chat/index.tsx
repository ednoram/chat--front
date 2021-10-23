import { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Typography, Container } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IRoom } from "src/types";
import { socket, ROOMS_ROUTE } from "src/constants";
import { selectUserData } from "src/store/selectors";
import { useAuthorize, useDisableBodyScroll } from "src/hooks";
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

  const loadingDiv = (
    <div className={styles.loading_room_div}>
      <CircularProgress color="primary" />
    </div>
  );

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

  const chatDiv = !loading ? (
    <div>
      <Messages />
      <Form roomId={roomId} />
    </div>
  ) : (
    loadingDiv
  );

  const roomsLink = (
    <Typography className={styles.rooms_link_container}>
      <Link to={ROOMS_ROUTE} className={styles.rooms_link}>
        <ArrowBackIosIcon className={styles.rooms_link_arrow} /> Rooms
      </Link>
    </Typography>
  );

  return (
    <>
      {!roomPassword && (
        <RoomPasswordForm
          room={room}
          roomsLink={roomsLink}
          setRoomPassword={setRoomPassword}
        />
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
        {roomsLink}
        {chatDiv}
      </Container>
    </>
  );
};

export default Chat;
