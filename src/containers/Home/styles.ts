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
  content: {
    gap: "28px",
    display: "flex",
    marginTop: "20px",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  account_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  rooms_link: {
    color: "black",
    textDecoration: "none",
  },
});

export default useStyles;
