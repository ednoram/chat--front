import { IMessage, IRoom, IUser } from "src/types";

interface State {
  user: {
    user: IUser | null;
  };
  chat: {
    rooms: IRoom[];
    messages: IMessage[];
  };
}

export default State;
