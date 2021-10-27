import { useState, useEffect, RefObject } from "react";

const useScrollPosition = (ref: RefObject<HTMLDivElement>): number | null => {
  const [scrollTop, setScrollTop] = useState<number | null>(null);

  const element = ref?.current;

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event?.target as Element;
      const scrollValue = target.scrollTop;

      setScrollTop(scrollValue);
    };

    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [element]);

  return scrollTop;
};

export default useScrollPosition;
