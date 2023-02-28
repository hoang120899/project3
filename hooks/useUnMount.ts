import { useEffect } from "react";

export const useUnMount = (callback: Function): void => {
  useEffect(
    () => () => {
      callback();
    },
    []
  );
};
