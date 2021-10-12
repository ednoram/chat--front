import { IMessage, IUser } from "src/types";

interface State {
  user: {
    user: IUser | null;
  };
  chat: {
    room: string | null;
    messages: IMessage[];
  };
}

export default State;
