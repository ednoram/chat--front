import { IUser } from "src/types";

interface State {
  user: IUser | null;
}

export interface Action {
  type: string;
  payload: {
    user: IUser;
  };
}

export const SET_USER_DATA = "SET_USER_DATA";

const INITIAL_STATE: State = {
  user: null,
};

const userReducer = (
  state: State = INITIAL_STATE,
  { type, payload }: Action
): State => {
  switch (type) {
    case SET_USER_DATA:
      return payload.user ? { ...state, user: payload.user } : state;

    default:
      return state;
  }
};

export default userReducer;
