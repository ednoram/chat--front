import { Dispatch as ReactDispatch, SetStateAction } from "react";
import { Dispatch } from "redux";
import { History } from "history";
import { AxiosError } from "axios";

import {
  Action,
  SET_ROOMS,
  ADD_MESSAGE,
  SET_MESSAGES,
  POST_MESSAGE,
  CREATE_CHAT_ROOM,
  DELETE_ROOM_MESSAGES,
} from "src/store/reducers/chat";
import { IMessage, IRoom } from "src/types";
import { API, ROOMS_ROUTE } from "src/constants";
import { createAction, getTokenCookie } from "src/utils";

export const sendCreateRoomAction = (): Action =>
  createAction(CREATE_CHAT_ROOM, {});

export const setChatRooms = (rooms: IRoom[]): Action =>
  createAction(SET_ROOMS, { rooms });

export const addChatMessage = (message: IMessage): Action =>
  createAction(ADD_MESSAGE, { message });

export const setChatMessages = (messages: IMessage[]): Action =>
  createAction(SET_MESSAGES, { messages });

const sendPostMessageAction = (): Action => createAction(POST_MESSAGE, {});

const sendDeleteMessagesAction = (): Action =>
  createAction(DELETE_ROOM_MESSAGES, {});

export const fetchChatRooms =
  (setLoadingRooms: ReactDispatch<SetStateAction<boolean>>) =>
  async (dispatch: Dispatch): Promise<void> => {
    setLoadingRooms(true);

    try {
      const { data } = await API.get("/api/rooms");
      dispatch(setChatRooms(data));
    } catch {
      alert("Something went wrong");
    }

    setLoadingRooms(false);
  };

export const postChatRoom =
  (
    name: string,
    password: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    history: History
  ) =>
  async (dispatch: Dispatch): Promise<unknown> => {
    setErrors([]);
    setLoading(true);

    try {
      const token = getTokenCookie();

      const { data } = await API.post(
        "/api/rooms",
        { name, password },
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

export const getChatRoom = async (id: string): Promise<IRoom | null> => {
  try {
    const { data } = await API.get(`/api/rooms/${id}`);
    return data || null;
  } catch {
    return null;
  }
};

export const fetchMessages =
  (
    roomId: string,
    roomPassword: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setSuccess: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const { data } = await API.get("api/messages", {
        params: { roomId, roomPassword },
      });

      if (data) {
        dispatch(setChatMessages(data));
        setSuccess(true);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };

export const postMessage =
  (message: IMessage, emitMessage: (message: IMessage) => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = getTokenCookie();
      const { text, roomId } = message;

      await API.post(
        "api/messages",
        { text, roomId },
        { headers: { Authorization: token } }
      );

      emitMessage(message);
      dispatch(sendPostMessageAction());
    } catch {
      alert("Something went wrong");
    }
  };

export const deleteRoomMessages =
  (
    roomId: string,
    roomPassword: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    goToChatRoute: () => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const token = getTokenCookie();

      await API.delete("/api/messages", {
        headers: { Authorization: token },
        data: { roomId, roomPassword },
      });

      dispatch(sendDeleteMessagesAction());
      dispatch(setChatMessages([]));

      goToChatRoute();
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };
