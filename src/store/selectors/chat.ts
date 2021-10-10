import { State } from "src/types";

export const selectChatMessages = (state: State): string[] =>
  state.chat.messages;

export const selectChatRoom = (state: State): string | null => state.chat.room;
