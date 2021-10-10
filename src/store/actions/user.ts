import { SetStateAction, Dispatch as ReactDispatch } from "react";
import { Dispatch } from "redux";
import { AxiosError } from "axios";

import {
  createAction,
  getTokenCookie,
  setTokenCookie,
  removeTokenCookie,
} from "src/utils";
import { IUser } from "src/types";
import { API, LOGIN_ROUTE } from "src/constants";
import { SET_USER_DATA } from "src/store/reducers/user";

const setUserData = (data: IUser | null) =>
  createAction(SET_USER_DATA, { user: data });

export const logIn =
  (
    username: string,
    password: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const { data } = await API.post("/api/user/login", {
        username,
        password,
      });

      if (data?.user && data?.token) {
        dispatch(setUserData(data.user));
        setTokenCookie(data.token);
        location.href = "/";
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };

export const register =
  (
    username: string,
    password: string,
    passwordConfirmation: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>
  ) =>
  async (): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const { data } = await API.post("/api/user/register", {
        username,
        password,
        passwordConfirmation,
      });

      if (data?.success) {
        setErrors([]);
        location.href = LOGIN_ROUTE;
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };

export const logOut =
  () =>
  (dispatch: Dispatch): void => {
    removeTokenCookie();
    dispatch(setUserData(null));
  };

export const logInWithToken =
  () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const token = getTokenCookie();

      if (token) {
        const { data } = await API.post(
          "/api/user/login-with-token",
          {},
          { headers: { Authorization: token } }
        );

        if (data?.user && data?.token) {
          dispatch(setUserData(data.user));
          setTokenCookie(data.token);
        }
      } else {
        dispatch(logOut());
      }
    } catch {
      dispatch(logOut());
    }
  };
