import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "60px auto 110px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  room_text: {
    textAlign: "center",
  },
  admin_text: {
    textAlign: "center",
  },
  links_container: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "space-between",
  },
  edit_room_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  edit_room_icon: {
    height: "20px !important",
    marginBottom: "-2px",
  },
  messages_div: {
    gap: "6px",
    height: "500px",
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
  no_messages_text: {
    marginTop: "10px",
    textAlign: "center",
  },
  message_div: {
    maxWidth: "80%",
    minWidth: "10%",
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
  more_messages_loader: {
    margin: "10px 0 !important",
  },
  form_div: {
    gap: "8px",
    display: "flex",
    marginTop: "8px",
  },
  room_password_container: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "grid",
    position: "fixed",
    placeItems: "center",
    background: "rgba(0, 0, 0, 0.3)",
  },
  room_password_name: {
    textAlign: "center",
  },
  room_password_form: {
    background: "white",
    borderRadius: "8px",
    marginBottom: "50px",
    padding: "16px 20px",
  },
  room_password_form_loader: {
    marginBottom: "80px",
  },
  room_password_error: {
    paddingLeft: "4px",
  },
  room_password_submit: {
    width: "100%",
    marginTop: "16px",
    padding: "10px 20px",
  },
});

export default useStyles;
