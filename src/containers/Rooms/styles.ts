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
  home_link_container: {
    marginTop: "20px",
  },
  home_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  home_link_arrow: {
    margin: "0 -8px -2px 0",
    width: "20px !important",
    height: "17px !important",
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
