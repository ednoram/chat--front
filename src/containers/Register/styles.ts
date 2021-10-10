import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "90px auto 140px",
  },
  title: {
    fontWeight: 700,
    textAlign: "center",
  },
  login_link_text: {
    marginTop: "20px",
  },
  login_link: {
    color: theme.palette.primary.main,
  },
});

export default useStyles;
