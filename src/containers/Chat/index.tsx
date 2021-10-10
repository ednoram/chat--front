import { useRef, useEffect, FC } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { List, ListItemButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Container } from "@material-ui/core";

import { socket } from "src/constants";
import { useAuthorize } from "src/hooks";
import { setChatRoom } from "src/store/actions";
import { selectChatRoom, selectChatMessages } from "src/store/selectors";

import Form from "./Form";
import useStyles from "./styles";

const ROOMS = ["Room 1", "Room 2", "Room 3"];

const Chat: FC = () => {
  const styles = useStyles();

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

  const messagesDiv = (
    <div className={styles.messages_div}>
      {messages &&
        messages.map((message) => (
          <Box key={nanoid()} className={styles.message_div}>
            <Typography>{message}</Typography>
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
      <div>
        <Link to="/" className={styles.home_link}>
          ← Home
        </Link>
      </div>
      {roomsAndChat}
    </Container>
  );
};

export default Chat;
