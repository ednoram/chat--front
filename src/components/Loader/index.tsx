import { FC } from "react";
import { CircularProgress } from "@mui/material";

import styles from "./Loader.module.css";

interface Props {
  loading: boolean;
  className?: string;
  type?: "form" | "list" | "normal";
}

const Loader: FC<Props> = ({ loading, type, className }) => {
  const containerClassNames = [
    className,
    styles.loader_container,
    type === "form" ? styles.form_loader_container : "",
    type === "list" ? styles.list_loader_container : "",
  ].join(" ");

  return loading ? (
    <div className={containerClassNames}>
      <CircularProgress color="primary" />
    </div>
  ) : (
    <></>
  );
};

export default Loader;
