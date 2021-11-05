import { FC, Dispatch, SetStateAction } from "react";
import { nanoid } from "nanoid";
import { Alert, Box } from "@mui/material";

import styles from "./ErrorsList.module.css";

interface Props {
  errors: string[];
  setErrors: Dispatch<SetStateAction<string[]>>;
}

const ErrorsList: FC<Props> = ({ errors, setErrors }) => {
  return errors.length > 0 ? (
    <Box className={styles.list}>
      {errors.length > 0 &&
        errors.map((error) => (
          <Alert
            key={nanoid()}
            severity="error"
            onClose={() => setErrors(errors.filter((x) => x !== error))}
          >
            {error}
          </Alert>
        ))}
    </Box>
  ) : (
    <></>
  );
};

export default ErrorsList;
