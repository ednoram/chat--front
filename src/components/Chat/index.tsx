import { ReactElement } from "react";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";

import { selectMessages } from "src/store/selectors";

import Form from "./Form";
import useStyles from "./styles";

const Chat = (): ReactElement => {
  const styles = useStyles();
  const messages = useSelector(selectMessages);

  const messagesDiv = (
    <Box className={styles.messages_list}>
      {messages &&
        messages.map((message) => (
          <Box key={nanoid()} className={styles.message_div}>
            <Typography>{message}</Typography>
          </Box>
        ))}
    </Box>
  );

  return (
    <Box>
      {messagesDiv}
      <Form />
    </Box>
  );
};

export default Chat;
