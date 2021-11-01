import { useState, useEffect, useRef, FC } from "react";
import { nanoid } from "nanoid";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { elementScrollIntoView } from "seamless-scroll-polyfill";

import { useScrollPosition } from "src/hooks";
import { fetchMessages } from "src/store/actions";
import { ErrorsList, Loader } from "src/components";
import { selectUserData, selectChatMessagesData } from "src/store/selectors";

import useStyles from "./styles";

interface Props {
  roomId: string;
  roomPassword: string | null;
}

const Messages: FC<Props> = ({ roomId, roomPassword }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [divHeightCache, setDivHeightCache] = useState<number | null>(null);

  const user = useSelector(selectUserData);
  const { messages, offset, limit, totalCount } = useSelector(
    selectChatMessagesData
  );

  const messagesDivRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const styles = useStyles();
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition(messagesDivRef);

  useEffect(() => {
    if (
      scrollPosition !== null &&
      scrollPosition < 10 &&
      messages.length < totalCount &&
      !loading &&
      !success &&
      roomId &&
      roomPassword
    ) {
      dispatch(
        fetchMessages(
          roomId,
          roomPassword,
          offset,
          limit,
          setLoading,
          setErrors,
          setSuccess,
          messages
        )
      );
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (divHeightCache && messagesDivRef?.current && scrolled && !success) {
      if (messagesDivRef.current.scrollTop < 10) {
        messagesDivRef.current.scrollTop =
          messagesDivRef.current.scrollHeight - divHeightCache - 80;
      } else {
        scrollToTheEnd();
      }
    }

    if (messages.length > 0 && !scrolled) {
      scrollToTheEnd();
      setScrolled(true);
    }

    setDivHeightCache(messagesDivRef?.current?.scrollHeight || null);
    setTimeout(() => setSuccess(false));
  }, [messages]);

  const scrollToTheEnd = () => {
    if (messagesEndRef.current) {
      elementScrollIntoView(messagesEndRef.current, { block: "nearest" });
    }
  };

  const getMessageDate = (date: Date) =>
    new Date(date).toLocaleTimeString("en", {
      timeStyle: "short",
    });

  return (
    <div ref={messagesDivRef} className={styles.messages_div}>
      <ErrorsList errors={errors} setErrors={setErrors} />
      <Loader loading={loading} className={styles.more_messages_loader} />
      {messages && messages.length > 0 ? (
        messages.map((message) => (
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
        ))
      ) : (
        <Typography className={styles.no_messages_text}>No messages</Typography>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
