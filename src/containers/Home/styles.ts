import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    margin: "90px auto 140px",
  },
  logo_and_title: {
    gap: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    transform: "scale(0.8)",
  },
  title: {
    paddingBottom: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  username_text: {
    textAlign: "center",
  },
  links_list: {
    gap: "10px",
    display: "flex",
    marginTop: "20px",
    textAlign: "center",
    flexDirection: "column",
  },
  links_list_item: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
});

export default useStyles;
