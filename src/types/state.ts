import { IMessage, IRoom, IUser } from "src/types";

interface IState {
  user: {
    user: IUser | null;
  };
  chat: {
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
  };
}

export default IState;
