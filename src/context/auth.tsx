import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authAPI } from "src/api-client";
import { LoginPaypoad, User, UserLocalStorage } from "src/models";
import { PATH_AUTH, PATH_DASHBOARD } from "src/routes";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (payload: LoginPaypoad) => void;
  logout: () => void;
  user: any;
  loading: boolean;
  handleUpdateUser: (value: User) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: {},
  loading: false,
  handleUpdateUser: (value: User) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserLocalStorage>();
  const [loading, setLoading] = useState(true);

  const login = async (payload: LoginPaypoad) => {
    await setLoading(true);
    try {
      const user = await authAPI.login(payload);
      await router.push(PATH_DASHBOARD.dashboard);
      await setUser(user || undefined);
    } catch (error) {
      console.log("Login failed");
    }
    await setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await authAPI.logout();
    setUser(undefined);
    await setLoading(false);
    await router.push(PATH_AUTH.login);
  };
  const handleUpdateUser = useCallback((value: User) => {
    setUser((init) => {
      if (init) {
        return {
          ...init,
          firstName: value.firstName,
          lastName: value.lastName,
          username: value.username,
        };
      }
      return undefined;
    });
  }, []);
  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const user = await JSON.parse(localStorage.getItem("user") || "{}");
      if (user) {
        await setUser(user);
      }
      await setLoading(false);
    }
    loadUserFromLocalStorage();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user?.id,
        user,
        login,
        loading,
        logout,
        handleUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
