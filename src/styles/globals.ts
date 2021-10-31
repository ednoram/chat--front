import { makeStyles } from "@material-ui/core/styles";

const useGlobalStyles = makeStyles({
  "@global": {
    body: {
      margin: "0",
    },
  },
});

export default useGlobalStyles;
