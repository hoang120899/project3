import axiosClient from "api-client/axiosClient";
import { LoginPaypoad } from "models";

export const authAPI = {
  login(payload: LoginPaypoad) {
    return axiosClient.post("/login", payload);
  },
  logout() {
    return axiosClient.post("/logout");
  },
  getProfile() {
    return axiosClient.get("/profile");
  },
};
