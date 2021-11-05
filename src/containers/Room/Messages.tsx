import { useState, useEffect, useRef, FC } from "react";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useScrollPosition } from "src/hooks";
import { fetchMessages } from "src/store/actions";
import { ErrorsList, Loader } from "src/components";
import { selectChatMessagesData } from "src/store/selectors";

import styles from "./Room.module.css";
import MessageItems from "./MessageItems";

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

  const { messages, offset, limit, totalCount } = useSelector(
    selectChatMessagesData
  );

  const messagesDivRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition(messagesDivRef);

  useEffect(() => {
    if (
      scrollPosition !== null &&
      scrollPosition === 0 &&
      messages.length < totalCount &&
      !loading &&
      !success &&
      roomId &&
      roomPassword
    ) {
      setLoading(true);

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
    if (
      divHeightCache &&
      messagesDivRef?.current &&
      scrolled &&
      !success &&
      scrollPosition !== null
    ) {
      if (messagesDivRef.current.scrollTop < 40) {
        messagesDivRef.current.scrollTop =
          messagesDivRef.current.scrollHeight - divHeightCache - 80;
      } else if (
        scrollPosition + messagesDivRef.current.clientHeight >
        messagesDivRef.current.scrollHeight - 200
      ) {
        scrollToTheEnd();
      }
    }

    if (scrollPosition === null) {
      scrollToTheEnd();
    }

    if (messages.length > 0 && !scrolled) {
      scrollToTheEnd();
      setScrolled(true);
    }

    setDivHeightCache(messagesDivRef?.current?.scrollHeight || null);
    setTimeout(() => setSuccess(false));
  }, [messages]);

  const scrollToTheEnd = (options?: ScrollIntoViewOptions) => {
    if (messagesEndRef.current) {
      elementScrollIntoView(messagesEndRef.current, {
        block: "nearest",
        ...options,
      });
    }
  };

  const scrollDownButton = roomPassword &&
    messagesDivRef.current &&
    scrollPosition !== null &&
    scrollPosition + messagesDivRef.current.clientHeight <
      messagesDivRef.current.scrollHeight - 100 && (
      <Button
        aria-label="scroll to the end"
        className={styles.scroll_down_button}
        onClick={() => scrollToTheEnd({ behavior: "smooth" })}
      >
        <ArrowDownwardIcon color="primary" />
      </Button>
    );

  return (
    <div className={styles.messages_div_container}>
      <div ref={messagesDivRef} className={styles.messages_div}>
        <Loader loading={loading} className={styles.more_messages_loader} />
        <ErrorsList errors={errors} setErrors={setErrors} />
        {messages && messages.length > 0 ? (
          <MessageItems messages={messages} roomPassword={roomPassword || ""} />
        ) : (
          <Typography className={styles.no_messages_text}>
            No messages
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </div>
      {scrollDownButton}
    </div>
  );
};

export default Messages;
