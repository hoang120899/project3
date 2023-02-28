import "../styles/globals.css";
import { ThemeProvider } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import EmptyLayout from "component/layout/EmptyLayout";
import { AppPropsWithLayout } from "models";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { userService } from "services";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback(
    (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      console.log("userService.userValue", userService.userValue);
      console.log("url", url);

      setUser(userService.userValue);
      const publicPaths = ["/account/login", "/account/register"];
      const path = url.split("?")[0];
      if (!userService.userValue && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
          pathname: "/account/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        setAuthorized(true);
      }
    },
    [userService]
  );
  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return (
    <FluentProvider theme={teamsLightTheme}>
      <ThemeProvider>
        <Layout>{authorized && <Component {...pageProps} />}</Layout>
      </ThemeProvider>
    </FluentProvider>
  );
}
