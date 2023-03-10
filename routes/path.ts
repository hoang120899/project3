function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/account";
const ROOTS = "/";

export const PATH_PAGE = {
  page403: "/403",
  page404: "/404",
  page500: "/500",
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

export const PATH_DASHBOARD = {
  root: ROOTS,
  dashboard: path(ROOTS, "dashboard"),
  users: {
    root: path(ROOTS, "users/"),
    view: (id: any) => path(ROOTS, `users/edit/${id}`),
    addNew: () => path(ROOTS, `users/addUser`),
    profile: () => path(ROOTS, "users/profile"),
  },
};

export const PUBLIC_PATH = [PATH_AUTH.login, PATH_AUTH.register];

export const LIST_ROUTER_PATH = [
  {
    path: "/dashboard",
    key: "1",
  },
  {
    path: "/users",
    key: "2.1",
  },
  {
    path: "/users/profile",
    key: "2.2",
  },
];
