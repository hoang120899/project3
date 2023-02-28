import { useCallback, useRef, useState } from "react";

export const useInterval = (callback: () => void, time: number) => {
  const fn = useRef(callback);
  fn.current = callback;

  const setIntervalState = useState<NodeJS.Timeout>()[1];

  const run = useCallback(() => {
    cancel();
    setIntervalState(
      setInterval(() => {
        return fn.current();
      }, time)
    );
  }, [fn.current, time]);

  const cancel = useCallback(() => {
    setIntervalState((old) => {
      if (old) {
        clearInterval(old);
      }

      return undefined;
    });
  }, []);

  return {
    run,
    cancel,
  };
};
