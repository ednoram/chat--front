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
  searchbox: {
    gap: "6px",
    display: "grid",
    gridTemplateColumns: "auto 70px",
  },
  searchbox_button: {
    margin: "16px 0 8px",
  },
  clear_search_filter_icon: {
    paddingLeft: "3px",
    cursor: "pointer",
    marginBottom: "-7px",
    fill: `${theme.palette.secondary.main} !important`,
  },
  no_rooms_text: {
    marginTop: "28px",
    textAlign: "center",
  },
  show_more_button_container: {
    display: "flex",
    justifyContent: "center",
  },
});

export default useStyles;
