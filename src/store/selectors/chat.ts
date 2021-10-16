import { IMessage, IRoom, State } from "src/types";

export const selectChatMessages = (state: State): IMessage[] =>
  state.chat.messages;

export const selectChatRooms = (state: State): IRoom[] => state.chat.rooms;
