import { useEffect } from "react";

const useDisableBodyScroll = (shouldDisable: boolean): void => {
  useEffect(() => {
    const body = document.querySelector("body");

    if (body?.style) {
      if (shouldDisable) {
        body.style.overflow = "hidden";
        body.style.touchAction = "none";
        body.style.position = "relative";
      } else {
        body.style.position = "";
        body.style.overflow = "";
        body.style.touchAction = "";
      }
    }
  }, [shouldDisable]);
};

export default useDisableBodyScroll;
