import { useState, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Typography, Container } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IRoom } from "src/types";
import { useAuthorize } from "src/hooks";
import { socket, ROOMS_ROUTE } from "src/constants";
import { getChatRoom, setChatMessages } from "src/store/actions";

import Form from "./Form";
import Messages from "./Messages";
import useStyles from "./styles";

const Chat: FC = () => {
  const [room, setRoom] = useState<IRoom | null>(null);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: roomId }: { id: string } = useParams();

  useAuthorize();

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
    if (roomId) {
      socket.emit("room", roomId);
    }
  }, [roomId]);

  const loading = !room?.name;

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

  return (
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
      <Typography className={styles.rooms_link_container}>
        <Link to={ROOMS_ROUTE} className={styles.rooms_link}>
          <ArrowBackIosIcon className={styles.rooms_link_arrow} /> Rooms
        </Link>
      </Typography>
      {chatDiv}
    </Container>
  );
};

export default Chat;
