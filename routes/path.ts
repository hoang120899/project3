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
    view: (id: any) => path(ROOTS, `edit/${id}`),
    addNew: (id: any) => path(ROOTS, `users/add`),
  },
};
