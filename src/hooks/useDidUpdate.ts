import { useEffect, useRef } from "react";

// I also made it to support running when specific values update in deps
// The default value for deps will be undefined if you did not pass it
// and will have the same effect as not passing the parameter to useEffect
// so it watch for general updates by default
export function useDidUpdate(callback: Function, deps?: Array<any>) {
  const hasMount = useRef(false);
  useEffect(() => {
    if (hasMount.current) {
      return callback && callback();
    }

    hasMount.current = true;
  }, deps);
}
