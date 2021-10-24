import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  arrow_icon: {
    margin: "0 -6px -3px 0",
    width: "20px !important",
    height: "17px !important",
  },
});

export default useStyles;
