import { useCallback, useRef, useState } from "react";

export const useTimeout = (callback: () => void, time: number) => {
  const fn = useRef(callback);
  fn.current = callback;

  const setTimeoutState = useState<NodeJS.Timeout>()[1];

  const run = useCallback(() => {
    cancel();
    setTimeoutState(
      setTimeout(() => {
        return fn.current();
      }, time)
    );
  }, [fn.current, time]);

  const cancel = useCallback(() => {
    setTimeoutState((old) => {
      if (old) {
        clearTimeout(old);
      }

      return undefined;
    });
  }, []);

  return {
    run,
    cancel,
  };
};
