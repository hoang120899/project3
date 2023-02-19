import "../styles/globals.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Component {...pageProps} />
    </FluentProvider>
  );
}
