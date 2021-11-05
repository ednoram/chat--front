import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  palette: {
    primary: {
      main: "#00838f",
      contrastText: "white",
    },
    secondary: {
      main: "#d81b60",
      contrastText: "white",
    },
  },
});

export default theme;
