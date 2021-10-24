import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    margin: "70px auto 140px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  loading_div: {
    display: "flex",
    marginTop: "40px",
    justifyContent: "center",
  },
  content: {
    gap: "28px",
    display: "flex",
    marginTop: "20px",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  rooms_link: {
    color: "black",
    textDecoration: "none",
  },
});

export default useStyles;
