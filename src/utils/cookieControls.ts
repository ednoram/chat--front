import cookie, { CookieAttributes } from "js-cookie";

const TOKEN_COOKIE_OPTIONS: CookieAttributes = {
  sameSite: "strict",
  secure: true,
  expires: 1,
};

export const getTokenCookie = (): string | undefined => cookie.get("token");

export const setTokenCookie = (value: string): void => {
  cookie.set("token", value, TOKEN_COOKIE_OPTIONS);
};

export const removeTokenCookie = (): void => {
  cookie.remove("token", TOKEN_COOKIE_OPTIONS);
};
