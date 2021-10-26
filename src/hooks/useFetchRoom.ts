import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { IRoom } from "src/types";
import { ROOMS_ROUTE } from "src/constants";
import { getChatRoom, setChatMessages } from "src/store/actions";

const useFetchRoom = (roomId: string): IRoom | null => {
  const [room, setRoom] = useState<IRoom | null>(null);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChatMessages([]));

    const fetchRoom = async () => {
      const chatRoom = await getChatRoom(roomId);

      if (!chatRoom) {
        history.push(ROOMS_ROUTE);
      } else {
        setRoom(chatRoom);
      }
    };

    fetchRoom();
  }, []);

  return room;
};

export default useFetchRoom;
