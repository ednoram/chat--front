import { IMessage } from "src/types";
import { socket } from "src/constants";

export const emitMessage = (message: IMessage): void => {
  socket.emit("message", message);
};

export const emitDeleteMessage = (message: IMessage): void => {
  socket.emit("delete-message", message);
};

export const emitRoom = (roomId: string, roomPassword: string): void => {
  socket.emit("room", roomId, roomPassword);
};
