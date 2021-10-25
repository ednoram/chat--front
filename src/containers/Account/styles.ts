import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 120px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  links_div: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "space-between",
  },
  edit_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  edit_link_icon: {
    height: "20px !important",
    marginBottom: "-2px",
  },
  user_info: {
    marginTop: "20px",
  },
  logout_button_container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  logout_button: {
    marginTop: "20px",
  },
});

export default useStyles;
