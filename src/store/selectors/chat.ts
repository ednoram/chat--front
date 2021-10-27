import { IMessage, IRoom, IState } from "src/types";

export const selectChatRoomsData = (
  state: IState
): {
  limit: number;
  offset: number;
  rooms: IRoom[];
  totalCount: number;
  searchFilter: string;
} => state.chat.rooms;

export const selectChatMessagesData = (
  state: IState
): {
  limit: number;
  offset: number;
  totalCount: number;
  messages: IMessage[];
} => state.chat.messages;
