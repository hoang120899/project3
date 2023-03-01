import { API_USERS } from "routes";
import useSWR from "swr";

export const useAuth = (id?: string) => {
  const {
    data: profileUser,
    error,
    mutate,
    isLoading,
  } = useSWR(`${API_USERS}/${id}`, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  async function login() {
    await mutate();
  }
  async function logout() {
    mutate({}, false);
  }
  return {
    profileUser,
    error,
    login,
    logout,
  };
};
