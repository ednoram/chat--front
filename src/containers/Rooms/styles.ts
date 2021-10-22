import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 140px",
  },
  title: {
    fontWeight: 700,
    textAlign: "center",
  },
  links_container: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-between",
  },
  home_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  home_link_icon: {
    margin: "0 -8px -2px 0",
    width: "20px !important",
    height: "17px !important",
  },
  create_room_link_icon: {
    margin: "0 -2px -5px 0",
    height: "22px !important",
  },
  no_rooms_text: {
    marginTop: "28px",
    textAlign: "center",
  },
  loading_div: {
    display: "flex",
    marginTop: "30px",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default useStyles;
