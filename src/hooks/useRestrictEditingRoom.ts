import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IRoom } from "src/types";
import { selectUserData } from "src/store/selectors";

const useRestrictEditingRoom = (room: IRoom | null): void => {
  const history = useHistory();
  const user = useSelector(selectUserData);

  useEffect(() => {
    if (user && room && room.adminId !== user._id) {
      history.push("/");
    }
  }, [user, room]);
};

export default useRestrictEditingRoom;
