import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";

import { ACCOUNT_ROUTE } from "src/constants";
import { selectUserData } from "src/store/selectors";
import { HelmetLayout, BackLink } from "src/components";

import Form from "./Form";
import styles from "./EditAccount.module.css";

const EditAccount: FC = () => {
  const user = useSelector(selectUserData);

  return (
    <HelmetLayout title="Edit Account" description="Edit account page">
      <Container maxWidth="xs" className={styles.container}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          className={styles.title}
        >
          Edit Account
        </Typography>
        <Typography variant="h5" component="h2" className={styles.username}>
          {user?.username}
        </Typography>
        <Box className={styles.back_link_container}>
          <BackLink route={ACCOUNT_ROUTE} text="Account" />
        </Box>
        <Form />
      </Container>
    </HelmetLayout>
  );
};

export default EditAccount;
