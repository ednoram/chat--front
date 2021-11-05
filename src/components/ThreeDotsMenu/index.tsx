import { FC, useState, MouseEvent } from "react";
import { nanoid } from "nanoid";

import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import styles from "./ThreeDotsMenu.module.css";

interface IItem {
  text: string;
  handleClick: () => void;
  color?: "primary" | "secondary";
}

interface Props {
  items: IItem[];
  className?: string;
  color?: "primary" | "secondary";
}

const ThreeDotsMenu: FC<Props> = ({ items, color, className }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="open menu"
        aria-controls="long-menu"
        color={color || "inherit"}
        className={`${className || ""}`}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        keepMounted
        id="long-menu"
        onClose={closeMenu}
        anchorEl={anchorEl}
        className={styles.menu}
      >
        {items.map(({ text, handleClick, color }) => (
          <MenuItem
            key={nanoid()}
            onClick={() => {
              handleClick();
              closeMenu();
            }}
          >
            <ListItemIcon className={styles.list_item_icon}>
              <DeleteForeverIcon color={color} />
            </ListItemIcon>
            <ListItemText>
              <Typography color={color}>{text}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotsMenu;
