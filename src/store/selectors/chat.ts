import { State } from "src/types";

export const selectChatRoom = (state: State): string | null => state.chat.room;

export const selectChatMessages = (state: State): string[] =>
  state.chat.messages;
