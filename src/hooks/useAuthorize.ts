import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getTokenCookie } from "src/utils";
import { LOGIN_ROUTE } from "src/constants";

const useAuthorize = (options?: { reverse: boolean }): void => {
  const history = useHistory();

  useEffect(() => {
    const token = getTokenCookie();

    if (!token && !options?.reverse) {
      history.push(LOGIN_ROUTE);
    } else if (token && options?.reverse) {
      history.push("/");
    }
  }, []);
};

export default useAuthorize;
