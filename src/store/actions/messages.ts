import { ADD_MESSAGE, Action } from "src/store/reducers/messages";

export const addMessage = (message: string): Action => ({
  type: ADD_MESSAGE,
  payload: {
    message,
  },
});
