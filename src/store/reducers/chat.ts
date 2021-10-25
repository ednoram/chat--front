import { IMessage, IRoom } from "src/types";

interface State {
  rooms: IRoom[];
  messages: IMessage[];
}

export interface Action {
  type: string;
  payload: {
    rooms?: IRoom[];
    message?: IMessage;
    messages?: IMessage[];
  };
}

export const SET_ROOMS = "SET_ROOMS";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGES = "SET_MESSAGES";
export const POST_MESSAGE = "POST_MESSAGE";
export const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM";
export const DELETE_ROOM_MESSAGES = "DELETE_ROOM_MESSAGES";
export const CHANGE_ROOM_PASSWORD = "CHANGE_ROOM_PASSWORD";

const INITIAL_STATE: State = {
  rooms: [],
  messages: [],
};

const chatReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case SET_ROOMS:
      return payload.rooms ? { ...state, rooms: payload.rooms } : state;

    case SET_MESSAGES:
      return payload.messages
        ? { ...state, messages: payload.messages }
        : state;

    case ADD_MESSAGE:
      return payload.message
        ? { ...state, messages: [...state.messages, payload.message] }
        : state;

    default:
      return state;
  }
};

export default chatReducer;
