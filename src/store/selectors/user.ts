import { State, IUser } from "src/types";

export const selectUserData = (state: State): IUser | null => state.user.user;
