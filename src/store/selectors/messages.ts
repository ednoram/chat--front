import { State } from "src/types";

export const selectMessages = (state: State): string[] =>
  state.messages.messages;
