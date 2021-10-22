import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useAuthorize } from "src/hooks";
import { ROOMS_ROUTE } from "src/constants";

import Form from "./Form";
import useStyles from "./styles";

const CreateRoom: FC = () => {
  const styles = useStyles();

  useAuthorize();

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        className={styles.title}
      >
        Create Room
      </Typography>
      <Box className={styles.rooms_link_container}>
        <Typography>
          <Link to={ROOMS_ROUTE} className={styles.rooms_link}>
            <ArrowBackIosIcon className={styles.rooms_link_icon} /> Rooms
          </Link>
        </Typography>
      </Box>
      <Form />
    </Container>
  );
};

export default CreateRoom;
