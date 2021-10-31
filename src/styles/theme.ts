import { createTheme } from "@material-ui/core";
import { cyan, pink } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: cyan[800],
      contrastText: "white",
    },
    secondary: {
      main: pink[600],
      contrastText: "white",
    },
  },
});

export default theme;
