import { useState, useEffect, useRef, FC } from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Container } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IRoom } from "src/types";
import { useAuthorize } from "src/hooks";
import { socket, ROOMS_ROUTE } from "src/constants";
import { getChatRoom, setChatMessages } from "src/store/actions";
import { selectUserData, selectChatMessages } from "src/store/selectors";

import Form from "./Form";
import useStyles from "./styles";

const Chat: FC = () => {
  const [room, setRoom] = useState<IRoom | null>(null);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: roomId }: { id: string } = useParams();

  const user = useSelector(selectUserData);
  const messages = useSelector(selectChatMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  const getMessageDate = (date: Date) =>
    new Date(date).toLocaleTimeString("en", {
      timeStyle: "short",
    });

  const messagesDiv = (
    <div className={styles.messages_div}>
      {messages &&
        messages.map((message) => (
          <Box
            key={nanoid()}
            className={[
              styles.message_div,
              message.user._id === user?._id ? styles.message_div_own : "",
            ].join(" ")}
          >
            <Typography
              className={[
                styles.message_username,
                message.user._id === user?._id
                  ? styles.message_username_own
                  : "",
              ].join(" ")}
            >
              {message.user.username}
            </Typography>
            <Typography className={styles.message_text}>
              {message.text}
            </Typography>
            <Typography className={styles.message_time}>
              {getMessageDate(message?.date)}
            </Typography>
          </Box>
        ))}
      <div ref={messagesEndRef} />
    </div>
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
      {room?.name && (
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          className={styles.room_text}
        >
          Room: {room.name}
        </Typography>
      )}
      <Typography className={styles.rooms_link_container}>
        <Link to={ROOMS_ROUTE} className={styles.rooms_link}>
          <ArrowBackIosIcon className={styles.rooms_link_arrow} /> Rooms
        </Link>
      </Typography>
      {messagesDiv}
      <Form roomId={roomId} />
    </Container>
  );
};

export default Chat;
