import { fetchWrapper } from "helpers";
import { User, UserRegister } from "models";
import Router from "next/router";
import { API_REGISTER, API_SIGNIN, API_USERS, PATH_AUTH } from "routes";
import { BehaviorSubject } from "rxjs";

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user") || "{}")
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(username: string, password: string) {
  return fetchWrapper.post(API_SIGNIN, { username, password }).then((user) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push(PATH_AUTH.login);
}

function register(user: UserRegister) {
  return fetchWrapper.post(API_REGISTER, user);
}

function getAll() {
  return fetchWrapper.get(API_USERS);
}

function getById(id: string) {
  return fetchWrapper.get(`${API_USERS}/${id}`);
}

function update(id: string, params: User) {
  return fetchWrapper.put(`${API_USERS}/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.setItem("user", JSON.stringify(user));

      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  return fetchWrapper.delete(`${API_USERS}/${id}`);
}
