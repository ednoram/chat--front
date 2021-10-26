import { FC } from "react";
import { CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  loading: boolean;
  type?: "form" | "list" | "normal";
}

const Loader: FC<Props> = ({ loading, type }) => {
  const styles = useStyles();

  const containerClassNames = [
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
