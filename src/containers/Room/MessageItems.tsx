import { FC } from "react";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { IMessage } from "src/types";
import { selectUserData } from "src/store/selectors";

import useStyles from "./styles";

interface Props {
  messages: IMessage[];
}

const MessageItems: FC<Props> = ({ messages }) => {
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
        </div>
      ))}
    </>
  );
};

export default MessageItems;
