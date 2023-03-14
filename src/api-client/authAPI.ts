import { BehaviorSubject } from "rxjs";
import { _deleteApi, _getApi, _postApi, _putApi } from "src/api-client/axiosClient";
import { LoginPaypoad, User, UserRegister } from "src/models";
import { API_REGISTER, API_SIGNIN, API_USERS } from "src/routes";

// console.log("typeof window", typeof window);
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user") || "{}")
);

const authAPI = {
  login(payload: LoginPaypoad) {
    return _postApi(API_SIGNIN, payload).then((data: any) => {
      userSubject.next(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    });
  },
  logout() {
    localStorage.removeItem("user");
    userSubject.next(null);
  },
  register(user: UserRegister) {
    return _postApi(API_REGISTER, user);
  },
  getAllUsers() {
    return _getApi(API_USERS);
  },
  getByIdUser(id: string) {
    return _getApi(`${API_USERS}/${id}`);
  },
  updateUser(id: string, params: User) {
    return _putApi(`${API_USERS}/${id}`, params).then((x) => {
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
  },
  deleteUser(id: string) {
    return _deleteApi(`${API_USERS}/${id}`);
  },
  get userValue() {
    return userSubject.value;
  },
};

const user = userSubject.asObservable();

export { user, authAPI };

