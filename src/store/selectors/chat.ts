import { IMessage, State } from "src/types";

export const selectChatMessages = (state: State): IMessage[] =>
  state.chat.messages;

export const selectChatRoom = (state: State): string | null => state.chat.room;
