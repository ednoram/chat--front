import { Dispatch as ReactDispatch, SetStateAction } from "react";
import { Dispatch } from "redux";
import { History } from "history";
import { AxiosError } from "axios";

import {
  Action,
  ADD_ROOMS,
  ADD_MESSAGE,
  RESET_ROOMS,
  SET_MESSAGES,
  POST_MESSAGE,
  CREATE_CHAT_ROOM,
  DELETE_CHAT_ROOM,
  DELETE_ROOM_MESSAGES,
  CHANGE_ROOM_PASSWORD,
  SET_TOTAL_ROOMS_COUNT,
  INCREASE_ROOMS_OFFSET,
  SET_ROOMS_SEARCH_FILTER,
} from "src/store/reducers/chat";
import { IMessage, IRoom } from "src/types";
import { API, ROOMS_ROUTE } from "src/constants";
import { createAction, getTokenCookie } from "src/utils";

const sendDeleteMessagesAction = (): Action =>
  createAction(DELETE_ROOM_MESSAGES, {});

const sendChangePasswordAction = (): Action =>
  createAction(CHANGE_ROOM_PASSWORD, {});

export const increaseRoomsOffset = (): Action =>
  createAction(INCREASE_ROOMS_OFFSET, {});

const addChatRooms = (rooms: IRoom[]): Action =>
  createAction(ADD_ROOMS, { rooms });

const setTotalRoomsCount = (totalCount: number): Action =>
  createAction(SET_TOTAL_ROOMS_COUNT, { totalCount });

export const addChatMessage = (message: IMessage): Action =>
  createAction(ADD_MESSAGE, { message });

export const setChatMessages = (messages: IMessage[]): Action =>
  createAction(SET_MESSAGES, { messages });

export const setRoomsSearchFilter = (searchFilter: string): Action =>
  createAction(SET_ROOMS_SEARCH_FILTER, { searchFilter });

export const resetChatRooms = (): Action => createAction(RESET_ROOMS, {});

const sendPostMessageAction = (): Action => createAction(POST_MESSAGE, {});

const sendCreateRoomAction = (): Action => createAction(CREATE_CHAT_ROOM, {});

const sendDeleteRoomAction = (): Action => createAction(DELETE_CHAT_ROOM, {});

export const fetchChatRooms =
  (
    offset: number,
    limit: number,
    searchFilter: string,
    setLoadingRooms: ReactDispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setLoadingRooms(true);

    try {
      const { data } = await API.get("/api/rooms", {
        params: { offset, limit, searchFilter },
      });

      dispatch(addChatRooms(data.rooms));
      dispatch(setTotalRoomsCount(data.totalCount));
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

export const changeRoomPassword =
  (
    roomId: string,
    currentPassword: string,
    newPassword: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    goToChatRoute: () => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const token = getTokenCookie();

      await API.patch(
        `/api/rooms/${roomId}`,
        { currentPassword, newPassword },
        { headers: { Authorization: token } }
      );

      dispatch(sendChangePasswordAction());
      goToChatRoute();
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
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

export const deleteRoom =
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

      await API.delete(`/api/rooms/${roomId}`, {
        headers: { Authorization: token },
        data: { roomPassword },
      });

      dispatch(setChatMessages([]));
      dispatch(sendDeleteRoomAction());

      goToChatRoute();
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };
