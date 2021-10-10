import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    marginTop: "20px",
  },
  submit_button: {
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  loading_div: {
    display: "flex",
    marginTop: "30px",
    alignItems: "center",
    justifyContent: "center",
  },
  errors_list: {
    color: "red",
    borderRadius: "5px",
    padding: "6px 0 !important",
    border: "1px solid red",
    background: "rgba(255, 0, 0, 0.05)",
  },
  errors_list_item: {
    padding: "2px 16px !important",
  },
});

export default useStyles;
