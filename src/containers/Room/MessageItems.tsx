import { useState, FC } from "react";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Backdrop, CircularProgress } from "@mui/material";

import { IMessage } from "src/types";
import { selectUserData } from "src/store/selectors";

import useStyles from "./styles";
import MessageMenu from "./MessageMenu";

interface Props {
  messages: IMessage[];
  roomPassword: string;
}

const MessageItems: FC<Props> = ({ messages, roomPassword }) => {
  const [loading, setLoading] = useState(false);

  const styles = useStyles();
  const user = useSelector(selectUserData);

  const getMessageDate = (date: Date) =>
    new Date(date).toLocaleTimeString("en", {
      timeStyle: "short",
    });

  return (
    <>
      {messages.map((message) => (
        <div
          key={nanoid()}
          className={[
            styles.message_div,
            message.username === user?.username ? styles.message_div_own : "",
          ].join(" ")}
        >
          <div className={styles.message_username_and_menu}>
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
            <MessageMenu
              message={message}
              setLoading={setLoading}
              roomPassword={roomPassword}
            />
          </div>
          <Typography className={styles.message_text}>
            {message.text}
          </Typography>
          <Typography className={styles.message_time}>
            {getMessageDate(message?.createdAt)}
          </Typography>
        </div>
      ))}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MessageItems;
