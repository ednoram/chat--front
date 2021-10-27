import { FC } from "react";
import { CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  loading: boolean;
  className?: string;
  type?: "form" | "list" | "normal";
}

const Loader: FC<Props> = ({ loading, type, className }) => {
  const styles = useStyles();

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
