interface State {
  messages: string[];
}

export interface Action {
  type: string;
  payload: {
    message?: string;
  };
}

export const ADD_MESSAGE = "ADD_MESSAGE";

const INITIAL_STATE: State = {
  messages: [],
};

const messagesReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case ADD_MESSAGE:
      return payload.message
        ? { messages: [...state.messages, payload.message] }
        : state;
    default:
      return state;
  }
};

export default messagesReducer;
