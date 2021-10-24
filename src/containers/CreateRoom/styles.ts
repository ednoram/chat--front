import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 110px",
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
  loading_div: {
    display: "flex",
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default useStyles;
