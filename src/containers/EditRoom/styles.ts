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
  room_name: {
    textAlign: "center",
  },
  back_link_container: {
    marginTop: "20px",
  },
  links_container: {
    gap: "20px",
    display: "flex",
    marginTop: "28px",
    flexDirection: "column",
  },
  change_password_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  delete_link: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
});

export default useStyles;
