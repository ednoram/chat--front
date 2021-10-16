import { Dispatch as ReactDispatch, SetStateAction } from "react";
import { Dispatch } from "redux";

import {
  Action,
  SET_ROOMS,
  ADD_MESSAGE,
  SET_MESSAGES,
} from "src/store/reducers/chat";
import { API } from "src/constants";
import { createAction } from "src/utils";
import { IMessage, IRoom } from "src/types";

export const setChatRooms = (rooms: IRoom[]): Action =>
  createAction(SET_ROOMS, { rooms });

export const addChatMessage = (message: IMessage): Action =>
  createAction(ADD_MESSAGE, { message });

export const setChatMessages = (messages: IMessage[]): Action =>
  createAction(SET_MESSAGES, { messages });

export const fetchChatRooms =
  (setLoadingRooms: ReactDispatch<SetStateAction<boolean>>) =>
  async (dispatch: Dispatch): Promise<void> => {
    setLoadingRooms(true);

    try {
      const { data } = await API.get("/api/rooms");
      dispatch(setChatRooms(data));
    } catch {
      alert("Something went wrong. Could not fetch rooms.");
    }

    setLoadingRooms(false);
  };

export const getChatRoom = async (id: string): Promise<IRoom | undefined> => {
  try {
    const { data } = await API.get(`/api/rooms/${id}`);
    return data;
  } catch {
    alert("Something went wrong");
  }
};
