import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  text: string;
  route: string;
}

import styles from "./BackLink.module.css";

const BackLink: FC<Props> = ({ route, text }) => {
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
