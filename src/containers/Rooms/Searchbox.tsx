import { useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Button } from "@mui/material";

import { setRoomsSearchFilter } from "src/store/actions";

import styles from "./Rooms.module.css";

const Searchbox: FC = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(setRoomsSearchFilter(inputValue.trim()));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.searchbox}>
      <TextField
        color="primary"
        margin="normal"
        variant="outlined"
        autoComplete="off"
        value={inputValue}
        label="Search for rooms"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        aria-label="search"
        className={styles.searchbox_button}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default Searchbox;
