import { INavLink, INavStyles, Nav } from "@fluentui/react/lib/Nav";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "src/context";
import { LIST_ROUTER_PATH, PATH_DASHBOARD } from "src/routes";

export const NavBar = () => {
  const navStyles: Partial<INavStyles> = useMemo(
    () => ({
      root: {
        width: 200,
        minHeight: "93.5vh",
        boxSizing: "border-box",
        borderRight: "1px solid #eee",
        overflowY: "auto",
      },
    }),
    []
  );
  const router = useRouter();
  const initSelectedKey = useMemo(() => {
    const routerPath = LIST_ROUTER_PATH.find(
      (item) => item.path === router.pathname
    );
    return routerPath?.key;
  }, [router, LIST_ROUTER_PATH]);
  const [selectedKey, setSelectedKey] = useState<any>(initSelectedKey);
  const { user } = useAuth();
  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLElement>, item: INavLink) => {
      e.preventDefault();
      setSelectedKey(item.key || "1");
      router.push(item.url);
    },
    []
  );
  const navLinkGroups: any[] = useMemo(
    () => [
      {
        links: [
          {
            name: "Dashboard",
            key: "1",
            url: PATH_DASHBOARD.dashboard,
            onClick: (e: any, item: INavLink) => handleNavigate(e, item),
          },
          {
            name: "User Management",
            key: "2",
            links: [
              {
                name: "All users",
                key: "2.1",
                url: PATH_DASHBOARD.users.root,
                onClick: (e: any, item: INavLink) => handleNavigate(e, item),
              },
              {
                name: "Profile",
                key: "2.2",
                url: PATH_DASHBOARD.users.profile(),
                onClick: (e: any, item: INavLink) => handleNavigate(e, item),
              },
            ],
            isExpanded: true,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const routerPath = LIST_ROUTER_PATH.find(
      (item) => item.path === router.pathname
    );
    setSelectedKey(routerPath?.key);
  }, [router.pathname]);

  useEffect(() => {
    console.log("selectedkey", selectedKey);
  }, [selectedKey]);
  return (
    <Nav
      ariaLabel="Nav"
      selectedKey={selectedKey}
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};
