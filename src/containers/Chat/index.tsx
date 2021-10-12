import { useRef, useEffect, FC } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { List, ListItemButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Container } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {
  selectChatRoom,
  selectUserData,
  selectChatMessages,
} from "src/store/selectors";
import { socket } from "src/constants";
import { useAuthorize } from "src/hooks";
import { setChatRoom } from "src/store/actions";

import Form from "./Form";
import useStyles from "./styles";

const ROOMS = ["Room 1", "Room 2", "Room 3"];

const Chat: FC = () => {
  const styles = useStyles();

  const user = useSelector(selectUserData);
  const chatRoom = useSelector(selectChatRoom);
  const messages = useSelector(selectChatMessages);

  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useAuthorize();

  useEffect(() => {
    socket.emit("room", chatRoom);
  }, [chatRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  useEffect(() => {
    dispatch(setChatRoom(ROOMS[0]));
  }, []);

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

  const roomsDiv = (
    <div>
      <Typography variant="h4" component="p" color="primary">
        Rooms
      </Typography>
      <List className={styles.rooms_div}>
        {ROOMS.map((room) => (
          <ListItemButton
            key={nanoid()}
            selected={room === chatRoom}
            onClick={() => dispatch(setChatRoom(room))}
          >
            {room}
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  const roomsAndChat = (
    <div className={styles.rooms_and_chat}>
      {roomsDiv}
      <div>
        {messagesDiv}
        <Form />
      </div>
    </div>
  );

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Chat
      </Typography>
      <Typography>
        <Link to="/" className={styles.home_link}>
          <ArrowBackIosIcon className={styles.home_link_arrow} /> Home
        </Link>
      </Typography>
      {roomsAndChat}
    </Container>
  );
};

export default Chat;
