import { useCallback, useState } from "react";

export const useNotification = () => {
  const [isOn, setIsOn] = useState(false);

  const handleShowNotification = useCallback((state: boolean) => {
    setIsOn(state);
  }, []);
  return {
    setStateNotification: handleShowNotification,
    show: isOn,
  };
};
