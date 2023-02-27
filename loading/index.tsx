import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToggle } from "../hooks/useToggle";

export type LoadingContextType = {
  startLoading: () => void;
  stopLoading: () => void;
  state: boolean;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export type LoadingComponentType = FunctionComponent<{
  state: boolean;
  color?: string;
  children?: React.ReactNode;
}>;

interface LoadingProviderProps {
  color?: string;
  component: LoadingComponentType;
  children?: ReactNode;
  isWrap?: boolean;
}

export function LoadingProvider({
  children,
  color,
  isWrap = false,
  component: Component,
}: LoadingProviderProps) {
  const { state, on: turnOnLoading, off: turnOffLoading } = useToggle();
  const setCount = useState(0)[1];

  const startLoading = useCallback(() => {
    turnOnLoading();
    setCount((cur) => cur + 1);
    setCount(1);
  }, []);

  const stopLoading = useCallback(() => {
    setTimeout(() => {
      setCount((cur) => {
        if (cur === 1) {
          turnOffLoading();
          return 0;
        }

        return cur - 1;
      });
    }, 500);
  }, []);

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, state }}>
      {isWrap ? (
        <Component state={state} color={color} children={children}></Component>
      ) : (
        <>
          {children}
          <Component state={state} color={color} />
        </>
      )}
    </LoadingContext.Provider>
  );
}

export const useLoading = (state?: boolean) => {
  const context = useContext<LoadingContextType | undefined>(LoadingContext);

  if (context === undefined) {
    throw new Error("useLoading must be used in LoadingProvider");
  }

  useEffect(() => {
    if (typeof state === "undefined") {
      return;
    }

    if (state) {
      context.startLoading();
    } else {
      context.stopLoading();
    }
  }, [state, context]);

  return context;
};
