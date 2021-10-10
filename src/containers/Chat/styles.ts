import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "60px auto 110px",
  },
  title: {
    fontWeight: 700,
    textAlign: "center",
  },
  home_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  rooms_and_chat: {
    gap: "20px",
    display: "grid",
    marginTop: "16px",
    gridTemplateColumns: "1fr 2fr",
  },
  rooms_div: {
    borderRight: `2px solid ${theme.palette.primary.main}`,
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
    marginLeft: "auto",
    borderRadius: "8px",
    padding: "8px 10px",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "1px 2px 4px 0 rgb(0 0 0 / 20%)",
  },
  form_div: {
    gap: "8px",
    display: "flex",
    marginTop: "8px",
  },
});

export default useStyles;
