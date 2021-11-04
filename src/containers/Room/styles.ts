import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "60px auto 100px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  room_name: {
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
  messages_div_container: {
    position: "relative",
  },
  messages_div: {
    gap: "6px",
    height: "60vh",
    display: "flex",
    padding: "0 8px",
    marginTop: "20px",
    minHeight: "400px",
    maxHeight: "700px",
    overflowY: "scroll",
    overflowX: "hidden",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      width: "0.3em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.2)",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.2)",
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
  message_username_and_menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message_username: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  message_username_own: {
    color: theme.palette.primary.contrastText,
  },
  three_dots_menu: {
    padding: "0",
    marginRight: "-5px",
    transform: "scale(0.9)",
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
  scroll_down_button: {
    right: "10px",
    bottom: "5px",
    position: "absolute",
    boxShadow: "1px 2px 4px 0 rgb(0 0 0 / 20%)",
    backgroundColor: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
  form_div: {
    gap: "8px",
    display: "flex",
    marginTop: "8px",
  },
  room_password_backdrop: {
    padding: "0 20px",
    boxSizing: "border-box",
  },
  room_password_form: {
    background: "white",
    borderRadius: "8px",
    marginBottom: "50px",
    padding: "16px",
  },
  room_password_name: {
    textAlign: "center",
  },
  room_password_form_loader: {
    marginBottom: "80px",
  },
  room_password_error: {
    paddingLeft: "4px",
  },
  room_password_submit: {
    width: "100%",
    marginTop: "10px",
    padding: "10px 20px",
  },
});

export default useStyles;
