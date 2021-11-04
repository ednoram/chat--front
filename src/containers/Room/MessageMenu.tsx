import { Dispatch, FC, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IMessage } from "src/types";
import { ThreeDotsMenu } from "src/components";
import { deleteMessage } from "src/store/actions";
import { selectUserData } from "src/store/selectors";

import useStyles from "./styles";

interface Props {
  message: IMessage;
  roomPassword: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const MessageMenu: FC<Props> = ({ message, roomPassword, setLoading }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  interface IItem {
    text: string;
    handleClick: () => void;
    color?: "primary" | "secondary";
  }

  const items: IItem[] = [
    {
      text: "Delete",
      color: "secondary",
      handleClick: () => {
        dispatch(deleteMessage(message, roomPassword, setLoading));
      },
    },
  ];

  return message.username === user?.username ? (
    <ThreeDotsMenu className={styles.three_dots_menu} items={items} />
  ) : (
    <></>
  );
};

export default MessageMenu;
