import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 110px",
  },
  title: {
    fontWeight: 700,
    textAlign: "center",
  },
  room_text: {
    textAlign: "center",
  },
  rooms_link_container: {
    marginTop: "10px",
  },
  rooms_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  rooms_link_arrow: {
    margin: "0 -8px -2px 0",
    width: "20px !important",
    height: "17px !important",
  },
  messages_div: {
    gap: "6px",
    height: "440px",
    display: "flex",
    padding: "0 8px",
    marginTop: "20px",
    overflowY: "scroll",
    overflowX: "hidden",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      width: "0.3em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  message_div: {
    maxWidth: "80%",
    marginLeft: "0",
    marginRight: "auto",
    borderRadius: "8px",
    padding: "6px 10px",
    boxShadow: "1px 2px 4px 0 rgb(0 0 0 / 20%)",
    backgroundColor: theme.palette.primary.contrastText,
  },
  message_div_own: {
    marginRight: "0",
    marginLeft: "auto",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  message_username: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  message_username_own: {
    color: theme.palette.primary.contrastText,
  },
  message_text: {
    wordBreak: "break-word",
  },
  message_time: {
    textAlign: "right",
    fontSize: "0.75rem",
  },
  form_div: {
    gap: "8px",
    display: "flex",
    marginTop: "8px",
  },
});

export default useStyles;
