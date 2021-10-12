import { IUser } from "src/types";

interface IMessage {
  date: Date;
  user: IUser;
  text: string;
}

export default IMessage;
