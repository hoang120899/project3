import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { loadTheme, ThemeProvider } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import EmptyLayout from "src/component/layout/EmptyLayout";
import { AuthProvider, ProtectRoute } from "src/context";
import { AppPropsWithLayout } from "src/models";
import { theme } from "src/theme";

import("src/styles/reset.scss").then(() => import("src/styles/globals.scss"));
initializeIcons();
loadTheme(theme);
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <AuthProvider>
      <FluentProvider theme={teamsLightTheme}>
        <ThemeProvider>
          <ProtectRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectRoute>
        </ThemeProvider>
      </FluentProvider>
    </AuthProvider>
  );
}
