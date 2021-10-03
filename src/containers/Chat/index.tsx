import { useRef, useEffect, ReactElement } from "react";
import { nanoid } from "nanoid";
import { Box, Typography } from "@material-ui/core";
import { List, ListItemButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { socket } from "src/constants";
import { setChatRoom } from "src/store/actions";
import { selectChatRoom, selectChatMessages } from "src/store/selectors";

import Form from "./Form";
import useStyles from "./styles";

const ROOMS = ["Room 1", "Room 2", "Room 3"];

const Chat = (): ReactElement => {
  const styles = useStyles();

  const chatRoom = useSelector(selectChatRoom);
  const messages = useSelector(selectChatMessages);

  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Chat
      </Typography>
      <div className={styles.rooms_and_chat}>
        {roomsDiv}
        <div>
          {messagesDiv}
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Chat;
