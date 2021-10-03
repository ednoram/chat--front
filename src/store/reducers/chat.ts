interface State {
  messages: string[];
  room: string | null;
}

export interface Action {
  type: string;
  payload: {
    room?: string;
    message?: string;
  };
}

export const SET_ROOM = "SET_ROOM";
export const ADD_MESSAGE = "ADD_MESSAGE";

const INITIAL_STATE: State = {
  room: null,
  messages: [],
};

const chatReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case SET_ROOM:
      return payload.room && payload.room.trim().length <= 20
        ? { ...state, messages: [], room: payload.room.trim() }
        : state;

    case ADD_MESSAGE:
      return payload.message && payload.message.trim().length <= 800
        ? { ...state, messages: [...state.messages, payload.message.trim()] }
        : state;

    default:
      return state;
  }
};

export default chatReducer;
