import { makeStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 36;

const useStyles = makeStyles({
  button: {
    padding: "0",
  },
  menu: {
    maxHeight: ITEM_HEIGHT * 4.5,
  },
  list_item_icon: {
    minWidth: "36px",
  },
});

export default useStyles;
