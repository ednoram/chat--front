import { useState, useEffect, FC } from "react";
import { nanoid } from "nanoid";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useHistory } from "react-router-dom";
import { List, ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Container, Typography } from "@material-ui/core";

import {
  fetchChatRooms,
  resetChatRooms,
  increaseRoomsOffset,
  setRoomsSearchFilter,
} from "src/store/actions";
import { useAuthorize } from "src/hooks";
import { selectChatRoomsData } from "src/store/selectors";
import { CREATE_ROOM_ROUTE, ROOMS_ROUTE } from "src/constants";
import { BackLink, HelmetLayout, Loader } from "src/components";

import useStyles from "./styles";
import Searchbox from "./Searchbox";

const Rooms: FC = () => {
  const [loadingRooms, setLoadingRooms] = useState(false);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { rooms, offset, limit, totalCount, searchFilter } =
    useSelector(selectChatRoomsData);

  useAuthorize();

  useEffect(() => {
    return () => {
      dispatch(resetChatRooms());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchChatRooms(offset, limit, searchFilter, setLoadingRooms));
  }, [offset, limit, searchFilter]);

  const handleShowMore = () => {
    dispatch(increaseRoomsOffset());
  };

  const clearSearchFilter = () => {
    dispatch(setRoomsSearchFilter(""));
  };

  const links = (
    <Box className={styles.links_container}>
      <BackLink route="/" text="Home" />
      <Typography>
        <Link to={CREATE_ROOM_ROUTE} className={styles.create_room_link}>
          <AddCircleIcon className={styles.create_room_link_icon} /> Create Room
        </Link>
      </Typography>
    </Box>
  );

  const searchFilterText = searchFilter && (
    <Typography>
      Showing matches for {`"${searchFilter}"`}
      <ClearIcon
        onClick={() => clearSearchFilter()}
        className={styles.clear_search_filter_icon}
      />
    </Typography>
  );

  const list =
    (rooms.length !== 0 || !loadingRooms) &&
    (rooms.length > 0 ? (
      <List>
        {rooms.map((room) => (
          <li key={nanoid()}>
            <ListItemButton
              onClick={() => history.push(`${ROOMS_ROUTE}/${room._id}`)}
            >
              <Typography>{room.name}</Typography>
            </ListItemButton>
          </li>
        ))}
      </List>
    ) : (
      <Typography className={styles.no_rooms_text}>
        Nothing was found
      </Typography>
    ));

  const showMoreButton = !loadingRooms && rooms.length < totalCount && (
    <Button color="primary" disabled={loadingRooms} onClick={handleShowMore}>
      Show More
    </Button>
  );

  return (
    <HelmetLayout title="Rooms" description="Chat rooms page">
      <Container maxWidth="sm" className={styles.container}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Rooms
        </Typography>
        {links}
        <Searchbox />
        {searchFilterText}
        {list}
        <Loader
          loading={loadingRooms}
          type={rooms.length === 0 ? "normal" : "list"}
        />
        <Box className={styles.show_more_button_container}>
          {showMoreButton}
        </Box>
      </Container>
    </HelmetLayout>
  );
};

export default Rooms;
