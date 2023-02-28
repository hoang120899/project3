import { EffectCallback, useEffect } from "react";

export function useMount(callback: EffectCallback) {
  useEffect(() => {
    return callback();
  }, []);
}
