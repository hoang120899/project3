import { INavLinkGroup, INavStyles, Nav } from "@fluentui/react/lib/Nav";
import { useMemo } from "react";
import { PATH_DASHBOARD } from "routes";

export const NavBar = () => {
  const navStyles: Partial<INavStyles> = useMemo(
    () => ({
      root: {
        width: 200,
        boxSizing: "border-box",
        borderRight: "1px solid #eee",
        overflowY: "auto",
      },
    }),
    []
  );

  const navLinkGroups: INavLinkGroup[] = useMemo(
    () => [
      {
        links: [
          {
            name: "Dashboard",
            expandAriaLabel: "Expand Home section",
            url: PATH_DASHBOARD.dashboard,
            key: "1",
          },
          {
            name: "User Management",
            expandAriaLabel: "Expand Home section",
            url: "/",
            key: "2",
            onClick: (e) => e?.preventDefault(),
            links: [
              {
                name: "All users",
                url: PATH_DASHBOARD.users.root,
                key: "2.1",
              },
              {
                name: "Profile",
                url: "",
                disabled: true,
                key: "2.2",
              },
            ],
            isExpanded: true,
          },
        ],
      },
    ],
    []
  );
  return (
    <Nav
      ariaLabel="Nav"
      styles={navStyles}
      groups={navLinkGroups}
      className="min-h-screen"
    />
  );
};
