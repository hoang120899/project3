import { Icon } from "@fluentui/react";
import { Button, Text } from "@fluentui/react-components";
import { NavBar } from "src/component/layout/nav";
import { useAuth } from "src/context";
import { LayoutProps } from "src/models";

export const MainLayout = (props: LayoutProps) => {
  const { logout } = useAuth();
  return (
    <div>
      <div className="app-layout min-h-screen">
        <div className="header">
          <div className="flex justify-between items-center h-full">
            <div className="logo h-full flex items-center content-between ml-8">
              <Text as="h4" weight="bold" size={500} className="text-white">
                My app
              </Text>
            </div>
            <div className="user-action ">
              <div>
                <Button
                  className="mr-8 text-white"
                  icon={<Icon iconName="SignOut" />}
                  onClick={() => logout()}
                  appearance="subtle"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            <NavBar />
          </div>
          <div className="p-4 w-full h-full">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
