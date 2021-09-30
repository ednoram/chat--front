import { FC } from "react";

import useStyles from "./styles";

const App: FC = () => {
  const styles = useStyles();

  return <div className={styles.container}></div>;
};

export default App;
