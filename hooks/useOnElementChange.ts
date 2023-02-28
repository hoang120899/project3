import { RefObject, useEffect, useMemo } from "react";

const config = { attributes: true, childList: true, subtree: true };

export const useOnElementChange = (
  target: HTMLElement | RefObject<HTMLElement | undefined | null>,
  callback: MutationCallback
) => {
  const observer = useMemo(() => {
    return new MutationObserver(callback);
  }, [callback]);

  useEffect(() => {
    const nodeTarget = target instanceof HTMLElement ? target : target.current;

    if (nodeTarget) {
      observer.observe(nodeTarget, config);
    }

    return () => {
      observer.disconnect();
    };
  }, [observer, target]);
};
