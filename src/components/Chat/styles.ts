import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  message_div: {
    marginLeft: "auto",
    borderRadius: "8px",
    padding: "8px 10px",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "1px 2px 4px 0 rgb(0 0 0 / 20%)",
  },
  messages_list: {
    gap: "6px",
    height: "440px",
    display: "flex",
    padding: "20px 8px",
    overflowY: "scroll",
    overflowX: "hidden",
    margin: "20px 0 8px",
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
  input_and_button: {
    display: "flex",
    gap: "8px",
  },
});

export default useStyles;
