import { makeStyles } from "@material-ui/core/styles";

import { theme } from "src/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 110px",
  },
  title: {
    textAlign: "center",
  },
  rooms_link_container: {
    marginTop: "20px",
  },
  rooms_link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  rooms_link_icon: {
    margin: "0 -8px -3px 0",
    width: "20px !important",
    height: "17px !important",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  submit_button: {
    padding: "8px 0",
    marginTop: "16px",
  },
  loading_div: {
    display: "flex",
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
  errors_list: {
    color: "red",
    borderRadius: "5px",
    border: "1px solid red",
    padding: "6px 0 !important",
    marginTop: "20px !important",
    background: "rgba(255, 0, 0, 0.05)",
  },
  errors_list_item: {
    padding: "2px 16px !important",
  },
});

export default useStyles;
