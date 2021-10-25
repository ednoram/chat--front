import { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@material-ui/core";

import { IRoom } from "src/types";
import { useAuthorize } from "src/hooks";
import { ROOMS_ROUTE } from "src/constants";
import { selectUserData } from "src/store/selectors";
import { BackLink, HelmetLayout } from "src/components";
import { getChatRoom, setChatMessages } from "src/store/actions";

import useStyles from "./styles";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteMessagesForm from "./DeleteMessagesForm";

const EditRoom: FC = () => {
  const [room, setRoom] = useState<IRoom | null>(null);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: roomId }: { id: string } = useParams();

  const user = useSelector(selectUserData);

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
    if (user && room && room.adminId !== user._id) {
      history.push("/");
    }
  }, [user, room]);

  const chatRoute = `${ROOMS_ROUTE}/${roomId}`;

  return (
    <HelmetLayout title="Edit Room" description="Edit Room page">
      <Container maxWidth="xs" className={styles.container}>
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Edit Room
        </Typography>
        <Typography variant="h6" component="h2" className={styles.room_name}>
          Room: {room?.name}
        </Typography>
        <Box className={styles.back_link_container}>
          <BackLink route={chatRoute} text="Cancel" />
        </Box>
        <section>
          <ChangePasswordForm roomId={roomId} chatRoute={chatRoute} />
        </section>
        <section>
          <DeleteMessagesForm roomId={roomId} chatRoute={chatRoute} />
        </section>
      </Container>
    </HelmetLayout>
  );
};

export default EditRoom;
