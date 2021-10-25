import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 140px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  links_container: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-between",
  },
  create_room_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  create_room_link_icon: {
    margin: "0 -2px -5px 0",
    height: "22px !important",
  },
  no_rooms_text: {
    marginTop: "28px",
    textAlign: "center",
  },
});

export default useStyles;
