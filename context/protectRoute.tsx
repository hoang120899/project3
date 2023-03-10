import { useAuth } from "context/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { PATH_AUTH, PATH_DASHBOARD, PUBLIC_PATH } from "routes";

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const handlePrivateRoute = useCallback(() => {
    if (
      !isAuthenticated &&
      !loading &&
      !PUBLIC_PATH.find((path) => path === router.pathname)
    ) {
      router.push(PATH_AUTH.login);
    }
    if (
      PUBLIC_PATH.find((path) => path === router.pathname) &&
      isAuthenticated &&
      !loading
    ) {
      router.push(PATH_DASHBOARD.dashboard);
    }
  }, [isAuthenticated, router.pathname, loading]);
  useEffect(() => {
    handlePrivateRoute();
  }, [isAuthenticated, router.pathname, loading]);

  return <>{loading ? <div>Loading</div> : children}</>;
};
