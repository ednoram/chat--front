import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  text: string;
  route: string;
}

import useStyles from "./styles";

const BackLink: FC<Props> = ({ route, text }) => {
  const styles = useStyles();

  return (
    <Typography>
      <Link to={route} className={styles.link}>
        <ArrowBackIosIcon className={styles.arrow_icon} />
        {text}
      </Link>
    </Typography>
  );
};

export default BackLink;
