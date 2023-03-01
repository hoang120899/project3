import { Text } from "@fluentui/react-components";
import { NavBar } from "component/layout/main/NavBar";
import { LayoutProps } from "models";
import { useCallback } from "react";
import { userService } from "services";

export const MainLayout = (props: LayoutProps) => {
  const handleLogout = useCallback(() => {
    userService.logout();
  }, []);
  return (
    <div>
      <div className="app-layout min-h-screen">
        <div className="header">
          <div className="flex justify-between items-center h-full">
            <div className="logo h-full flex items-center content-between">
              <Text as="h4" weight="bold" size={500} className="ml-8">
                My app
              </Text>
            </div>
            <div className="user-action">
              <div className="btn-logout mr-8" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="">
            <NavBar />
          </div>
          <div className="p-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
