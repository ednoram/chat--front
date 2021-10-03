import { Action, ADD_MESSAGE, SET_ROOM } from "../reducers/chat";

export const setChatRoom = (room: string): Action => ({
  type: SET_ROOM,
  payload: {
    room,
  },
});

export const addChatMessage = (message: string): Action => ({
  type: ADD_MESSAGE,
  payload: {
    message,
  },
});
