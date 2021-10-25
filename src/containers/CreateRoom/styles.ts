import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 140px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  rooms_link_container: {
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  submit_button: {
    padding: "8px 0",
    marginTop: "16px",
  },
});

export default useStyles;
