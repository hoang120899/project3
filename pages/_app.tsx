import "../styles/globals.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import EmptyLayout from "component/layout/EmptyLayout";
import { AppPropsWithLayout } from "models";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FluentProvider>
  );
}
