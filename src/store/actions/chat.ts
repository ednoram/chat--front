import { Dispatch as ReactDispatch, SetStateAction } from "react";
import { Dispatch } from "redux";
import { History } from "history";
import { AxiosError } from "axios";

import {
  Action,
  SET_ROOMS,
  ADD_MESSAGE,
  SET_MESSAGES,
  GET_CHAT_ROOM,
  CREATE_CHAT_ROOM,
} from "src/store/reducers/chat";
import { IMessage, IRoom } from "src/types";
import { API, ROOMS_ROUTE } from "src/constants";
import { createAction, getTokenCookie } from "src/utils";

export const sendGetRoomAction = (): Action => createAction(GET_CHAT_ROOM, {});

export const sendCreateRoomAction = (): Action =>
  createAction(CREATE_CHAT_ROOM, {});

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

export const postChatRoom =
  (
    name: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    history: History
  ) =>
  async (dispatch: Dispatch): Promise<unknown> => {
    setLoading(true);

    try {
      const token = getTokenCookie();

      const { data } = await API.post(
        "/api/rooms",
        { name },
        { headers: { Authorization: token } }
      );

      dispatch(sendCreateRoomAction());

      setLoading(false);
      history.push(ROOMS_ROUTE);
      return data;
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };

export const getChatRoom = async (id: string): Promise<IRoom | undefined> => {
  try {
    const { data } = await API.get(`/api/rooms/${id}`);
    return data;
  } catch {
    alert("Something went wrong");
  }
};
