import { useEffect } from "react";

const useDisableBodyScroll = (shouldDisable: boolean): void => {
  const disableBodyScroll = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.position = "relative";
    }
  };

  const enableBodyScroll = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      body.style.position = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }
  };

  useEffect(() => {
    if (shouldDisable) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }

    return () => {
      enableBodyScroll();
    };
  }, [shouldDisable]);
};

export default useDisableBodyScroll;
