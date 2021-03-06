import { IMessage, IRoom } from "src/types";

interface State {
  rooms: {
    limit: number;
    offset: number;
    rooms: IRoom[];
    totalCount: number;
    searchFilter: string;
  };
  messages: {
    limit: number;
    offset: number;
    totalCount: number;
    messages: IMessage[];
  };
}

export interface Action {
  type: string;
  payload: {
    id?: string;
    rooms?: IRoom[];
    message?: IMessage;
    totalCount?: number;
    messages?: IMessage[];
    searchFilter?: string;
  };
}

export const ADD_ROOMS = "ADD_ROOMS";
export const RESET_ROOMS = "RESET_ROOMS";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGES = "SET_MESSAGES";
export const POST_MESSAGE = "POST_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM";
export const DELETE_CHAT_ROOM = "DELETE_CHAT_ROOM";
export const DELETE_ROOM_MESSAGES = "DELETE_ROOM_MESSAGES";
export const CHANGE_ROOM_PASSWORD = "CHANGE_ROOM_PASSWORD";
export const INCREASE_ROOMS_OFFSET = "INCREASE_ROOMS_OFFSET";
export const SET_TOTAL_ROOMS_COUNT = "SET_TOTAL_ROOMS_COUNT";
export const SET_ROOMS_SEARCH_FILTER = "SET_ROOMS_SEARCH_FILTER";
export const SET_TOTAL_MESSAGES_COUNT = "SET_TOTAL_MESSAGES_COUNT";

const INITIAL_STATE: State = {
  rooms: {
    limit: 10,
    offset: 0,
    rooms: [],
    totalCount: 0,
    searchFilter: "",
  },
  messages: {
    limit: 10,
    offset: 0,
    messages: [],
    totalCount: 0,
  },
};

const chatReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case RESET_ROOMS:
      return {
        ...state,
        rooms: INITIAL_STATE.rooms,
      };

    case SET_MESSAGES:
      return payload.messages
        ? {
            ...state,
            messages: {
              ...state.messages,
              messages: payload.messages,
              offset: payload.messages.length,
            },
          }
        : state;

    case ADD_MESSAGE:
      return payload.message
        ? {
            ...state,
            messages: {
              ...state.messages,
              offset: state.messages.offset + 1,
              messages: [...state.messages.messages, payload.message],
            },
          }
        : state;

    case ADD_ROOMS:
      return payload.rooms
        ? {
            ...state,
            rooms: {
              ...state.rooms,
              rooms: [...state.rooms.rooms, ...payload.rooms],
            },
          }
        : state;

    case REMOVE_MESSAGE:
      return payload.id
        ? {
            ...state,
            messages: {
              ...state.messages,
              messages: state.messages.messages.filter(
                (message) => message._id !== payload.id
              ),
            },
          }
        : state;

    case INCREASE_ROOMS_OFFSET:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          offset: state.rooms.offset + state.rooms.limit,
        },
      };

    case SET_TOTAL_ROOMS_COUNT:
      return payload.totalCount !== undefined
        ? {
            ...state,
            rooms: {
              ...state.rooms,
              totalCount: payload.totalCount,
            },
          }
        : state;

    case SET_TOTAL_MESSAGES_COUNT:
      return payload.totalCount !== undefined
        ? {
            ...state,
            messages: {
              ...state.messages,
              totalCount: payload.totalCount,
            },
          }
        : state;

    case SET_ROOMS_SEARCH_FILTER:
      return payload.searchFilter !== undefined &&
        payload.searchFilter !== state.rooms.searchFilter
        ? {
            ...state,
            rooms: {
              ...INITIAL_STATE.rooms,
              searchFilter: payload.searchFilter,
            },
          }
        : state;

    default:
      return state;
  }
};

export default chatReducer;
