import { useState, useEffect, FC } from "react";
import { nanoid } from "nanoid";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { List, Autocomplete, ListItemButton } from "@mui/material";
import { Box, Typography, Container, TextField } from "@material-ui/core";

import { useAuthorize } from "src/hooks";
import { fetchChatRooms } from "src/store/actions";
import { selectChatRooms } from "src/store/selectors";
import { CREATE_ROOM_ROUTE, ROOMS_ROUTE } from "src/constants";
import { BackLink, HelmetLayout, Loader } from "src/components";

import useStyles from "./styles";

const Rooms: FC = () => {
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const rooms = useSelector(selectChatRooms);

  useAuthorize();

  useEffect(() => {
    dispatch(fetchChatRooms(setLoadingRooms));
  }, []);

  const filteredRooms =
    searchFilter !== null
      ? rooms.filter((room) =>
          room.name.toLowerCase().includes(searchFilter.trim().toLowerCase())
        )
      : rooms;

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

  const searchBox = rooms && rooms.length > 0 && (
    <Autocomplete
      freeSolo
      color="primary"
      disableClearable
      options={rooms.map((room) => room.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          margin="normal"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      )}
    />
  );

  const list =
    filteredRooms.length > 0 ? (
      <List>
        {filteredRooms.map((room) => (
          <ListItemButton
            key={nanoid()}
            onClick={() => history.push(`${ROOMS_ROUTE}/${room._id}`)}
          >
            <Typography>{room.name}</Typography>
          </ListItemButton>
        ))}
      </List>
    ) : (
      <Typography className={styles.no_rooms_text}>
        Nothing was found
      </Typography>
    );

  return (
    <HelmetLayout title="Rooms" description="Chat rooms page">
      <Container maxWidth="sm" className={styles.container}>
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Rooms
        </Typography>
        {links}
        {searchBox}
        {loadingRooms && rooms.length === 0 ? <Loader loading={true} /> : list}
      </Container>
    </HelmetLayout>
  );
};

export default Rooms;
