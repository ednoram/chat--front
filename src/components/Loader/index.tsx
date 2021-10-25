import { FC } from "react";
import { CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

interface Props {
  loading: boolean;
  isFormLoader?: boolean;
}

const Loader: FC<Props> = ({ loading, isFormLoader }) => {
  const styles = useStyles();

  const containerClassName = isFormLoader
    ? styles.form_loader_container
    : styles.loader_container;

  return loading ? (
    <div className={containerClassName}>
      <CircularProgress color="primary" />
    </div>
  ) : (
    <></>
  );
};

export default Loader;
