import { useState, useEffect, FC } from "react";
import { nanoid } from "nanoid";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { List, ListItemButton, CircularProgress } from "@mui/material";

import { useAuthorize } from "src/hooks";
import { ROOMS_ROUTE } from "src/constants";
import { fetchChatRooms } from "src/store/actions";
import { selectChatRooms } from "src/store/selectors";

import useStyles from "./styles";

const Rooms: FC = () => {
  const [loadingRooms, setLoadingRooms] = useState(false);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const rooms = useSelector(selectChatRooms);

  useAuthorize();

  useEffect(() => {
    dispatch(fetchChatRooms(setLoadingRooms));
  }, []);

  const loadingDiv = (
    <div className={styles.loading_div}>
      <CircularProgress color="primary" />
    </div>
  );

  const list =
    rooms.length > 0 ? (
      <List>
        {rooms.map((room) => (
          <ListItemButton
            key={nanoid()}
            onClick={() => history.push(`${ROOMS_ROUTE}/${room._id}`)}
          >
            {room.name}
          </ListItemButton>
        ))}
      </List>
    ) : (
      <Typography className={styles.no_rooms_text}>No Rooms</Typography>
    );

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Rooms
      </Typography>
      <Typography className={styles.home_link_container}>
        <Link to="/" className={styles.home_link}>
          <ArrowBackIosIcon className={styles.home_link_arrow} /> Home
        </Link>
      </Typography>
      {loadingRooms && rooms.length === 0 ? loadingDiv : list}
    </Container>
  );
};

export default Rooms;
