import { useEffect, useRef, FC } from "react";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";

import { selectUserData, selectChatMessages } from "src/store/selectors";

import useStyles from "./styles";

const Messages: FC = () => {
  const styles = useStyles();

  const user = useSelector(selectUserData);
  const messages = useSelector(selectChatMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  const getMessageDate = (date: Date) =>
    new Date(date).toLocaleTimeString("en", {
      timeStyle: "short",
    });

  return (
    <div className={styles.messages_div}>
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Box
            key={nanoid()}
            className={[
              styles.message_div,
              message.username === user?.username ? styles.message_div_own : "",
            ].join(" ")}
          >
            <Typography
              className={[
                styles.message_username,
                message.username === user?.username
                  ? styles.message_username_own
                  : "",
              ].join(" ")}
            >
              {message.username}
            </Typography>
            <Typography className={styles.message_text}>
              {message.text}
            </Typography>
            <Typography className={styles.message_time}>
              {getMessageDate(message?.createdAt)}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography className={styles.no_messages_text}>No messages</Typography>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
