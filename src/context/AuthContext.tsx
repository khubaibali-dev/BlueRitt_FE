// src/context/AuthContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  ReactNode,
} from "react";
import { InternalAxiosRequestConfig } from "axios";
import api from "../api";
import { refreshToken } from "../api/auth";
import {
  getAccessToken,
  storeAccessToken,
} from "../utils/tokenStorage";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type AuthContextType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  setAccessToken: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string>(() =>
    getAccessToken()
  );
  const [loading, setLoading] = useState(true);

  const setAccessToken = (token: string) => {
    storeAccessToken(token);
    setAccessTokenState(token);
  };

  // On mount: try existing token, else refresh
  useEffect(() => {
    const init = async () => {
      try {
        const existing = getAccessToken();
        if (existing) {
          setAccessTokenState(existing);
        } else {
          const res = await refreshToken();
          setAccessToken(res.data.access);
        }
      } catch {
        setAccessToken("");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Attach Bearer token to every request
  useLayoutEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const token = !config._retry && getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
    return () => api.interceptors.request.eject(reqInterceptor);
  }, [accessToken]);

  // Auto-refresh on 401/403
  useLayoutEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config as CustomAxiosRequestConfig;
        const isRefreshEndpoint = original.url?.includes("auth/refresh");
        if (
          !isRefreshEndpoint &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          try {
            const res = await refreshToken();
            setAccessToken(res.data.access);
            original.headers.Authorization = `Bearer ${res.data.access}`;
            original._retry = true;
            return api(original);
          } catch {
            setAccessToken("");
          }
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(resInterceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
