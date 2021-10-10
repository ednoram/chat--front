import { IUser } from "src/types";

interface State {
  user: {
    user: IUser | null;
  };
  chat: {
    messages: string[];
    room: string | null;
  };
}

export default State;
