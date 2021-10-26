import { IState, IUser } from "src/types";

export const selectUserData = (state: IState): IUser | null => state.user.user;
