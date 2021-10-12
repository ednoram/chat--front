import { IMessage } from "src/types";
import { createAction } from "src/utils";
import { Action, ADD_MESSAGE, SET_ROOM } from "src/store/reducers/chat";

export const setChatRoom = (room: string): Action =>
  createAction(SET_ROOM, { room });

export const addChatMessage = (message: IMessage): Action =>
  createAction(ADD_MESSAGE, { message });
