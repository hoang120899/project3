import axios, { AxiosResponse } from "axios";
import { authAPI } from "src/api-client/authAPI";

const axiosClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = authAPI.userValue;
  const isLoggedIn = user && user.token;
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return { Authorization: "" };
  }
}

function handleResponse(response: AxiosResponse<any>) {
  const data = response.data;
  if (response.statusText !== "OK") {
    if ([401, 403].includes(response.status) && authAPI.userValue) {
      authAPI.logout();
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

// api

const _getApi = (url: string, data?: any) =>
  axiosClient
    .get(url, { data: data, headers: { ...authHeader() } })
    .then(handleResponse);

const _postApi = (url: string, data: any) =>
  axiosClient
    .post(url, JSON.stringify(data), { headers: { ...authHeader() } })
    .then(handleResponse);

const _putApi = (url: string, data: any) =>
  axiosClient
    .put(url, JSON.stringify(data), { headers: { ...authHeader() } })
    .then(handleResponse);

const _deleteApi = (url: string) =>
  axiosClient
    .delete(url, { headers: { ...authHeader() } })
    .then(handleResponse);
//////

export { _getApi, _postApi, _putApi, _deleteApi };
