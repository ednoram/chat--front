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
import { API } from "src/constants";
import { SET_USER_DATA, CHANGE_USER_PASSWORD } from "src/store/reducers/user";

const setUserData = (data: IUser | null) =>
  createAction(SET_USER_DATA, { user: data });

const sendChangePasswordAction = () => createAction(CHANGE_USER_PASSWORD, {});

export const logIn =
  (
    username: string,
    password: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    goToHomeRoute: () => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const { data } = await API.post("/api/user/login", {
        username,
        password,
      });

      dispatch(setUserData(data.user));
      setTokenCookie(data.token);
      goToHomeRoute();
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
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    goToLoginRoute: () => void
  ) =>
  async (): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      await API.post("/api/user/register", {
        username,
        password,
        passwordConfirmation,
      });

      setErrors([]);
      goToLoginRoute();
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

export const changeUserPassword =
  (
    currentPassword: string,
    newPassword: string,
    passwordConfirmation: string,
    setLoading: ReactDispatch<SetStateAction<boolean>>,
    setErrors: ReactDispatch<SetStateAction<string[]>>,
    goToHomeRoute: () => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    setErrors([]);
    setLoading(true);

    try {
      const token = getTokenCookie();

      await API.patch(
        "api/user",
        {
          newPassword,
          currentPassword,
          passwordConfirmation,
        },
        { headers: { Authorization: token } }
      );

      dispatch(sendChangePasswordAction());
      goToHomeRoute();
    } catch (err) {
      setErrors((err as AxiosError).response?.data.errors);
    }

    setLoading(false);
  };
