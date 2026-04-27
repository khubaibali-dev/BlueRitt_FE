import { InternalAxiosRequestConfig } from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useContext,
  startTransition,
  useRef,
} from "react";

import api from "../api";
import { getUserDetails, refreshToken, logout } from "../api/auth";
import { TUser, TSearchQuota, TSubscriptionStatus, TUserFeatures } from "../types/user";
import { ACCESS_TOKEN_KEY, storeAccessToken, getAccessToken, getShouldRefresh } from "../utils/tokenStorage";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateUserQuotaData, prefetchUserQuotaData } from "../utils/prefetch";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type UserAuthContextType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  currentUser: TUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<TUser>>;
  fetchUserDetails: (force?: boolean) => Promise<void>;
  loading: boolean;
  needsSubscription: boolean;
  dueDate: string;
  logoutUser: () => Promise<void>;
};

type TUserAuthContextProviderProps = {
  children: ReactNode;
};

const initialUser: TUser = {
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  searchQuota: undefined,
  subscriptionStatus: undefined,
  dueDate: "",
};

const userAuthContext = createContext<UserAuthContextType>({
  accessToken: "",
  setAccessToken: () => {},
  currentUser: initialUser,
  setCurrentUser: () => {},
  fetchUserDetails: async (force?: boolean) => {},
  loading: true,
  needsSubscription: false,
  dueDate: "",
  logoutUser: async () => {},
});

const AuthProvider: React.FC<TUserAuthContextProviderProps> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // Use state to track token for component rerenders, but always read/write from localStorage
  const [accessToken, setAccessTokenState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getAccessToken();
    }
    return "";
  });
  const [currentUser, setCurrentUser] = useState<TUser>(initialUser);
  const [loading, setLoading] = useState(true);
  const [needsSubscription, setNeedsSubscription] = useState(false);
  const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  // Use ref to store the refresh promise to prevent race conditions
  const refreshPromiseRef = useRef<Promise<string> | null>(null);

  // Create a function to update both state and localStorage
  const setAccessToken = (token: string) => {
    storeAccessToken(token);
    setAccessTokenState(token);
  };

  const checkSubscriptionStatus = (user: TUser) => {
    // If we haven't checked subscription yet and user data is loaded
    if (!hasCheckedSubscription && user.email && user.subscriptionStatus) {
      setHasCheckedSubscription(true);

      const hasActiveSubscription =
        user.subscriptionStatus.has_active_subscription;
      const isOnTrial = user.subscriptionStatus.on_trial;

      // If user doesn't have an active subscription and is not on trial
      if (!hasActiveSubscription && !isOnTrial) {
        setNeedsSubscription(true);
      } else {
        setNeedsSubscription(false);
      }
    }
  };

  const fetchUserDetails = async (force = false) => {
    try {
      // Get token from localStorage to ensure we have the latest value
      const token = getAccessToken();
      if (!token) return;

      setIsRequestInProgress(true);
      
      // Use queryClient.fetchQuery to deduplicate with useUserDetails hook
      const userProfile = await queryClient.fetchQuery({
        queryKey: ['user-details'],
        queryFn: async () => {
          const res = await getUserDetails();
          return res.data;
        },
        staleTime: force ? 0 : 5 * 60 * 1000,
      });

      const updatedUser: TUser = {
        email: userProfile.email,
        firstName: userProfile.profile.first_name,
        lastName: userProfile.profile.last_name,
        fullName: userProfile.profile.full_name,
        phone: userProfile.profile.phone,
        country: userProfile.profile.country || "",
        businessType: userProfile.profile.business_type || "",
        experienceLevel: userProfile.profile.experience_level || "",
        goals: userProfile.profile.main_goals || [],
        searchQuota: userProfile.search_quota as TSearchQuota,
        features: userProfile.features as TUserFeatures,
        subscriptionStatus:
          userProfile.subscription_status as TSubscriptionStatus,
        dueDate: userProfile.subscription_status.due_on,
      };

      setCurrentUser(updatedUser);

      // Prefetch user quota data for future use (only when authenticated)
      prefetchUserQuotaData(queryClient).catch(error => {
        console.error('Failed to prefetch user quota data:', error);
      });

      // Redirect user from login page to home page if authenticated
      if (window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/verify-otp') {
        window.location.href = '/dashboard';
      }

      // Check if user needs to be redirected to subscription page
      checkSubscriptionStatus(updatedUser);
    } catch (error: any) {
      console.error("Error fetching user details:", error);
      // Only reset on authentication errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setAccessToken("");
        setCurrentUser(initialUser);
      }
    } finally {
      setIsRequestInProgress(false);
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during API logout:", error);
    } finally {
      // Always cleanup local state even if API fails
      setAccessToken("");
      setCurrentUser(initialUser);
      invalidateUserQuotaData(queryClient);
      
      // Redirect to login page
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Check if we already have a token in localStorage
        const existingToken = getAccessToken();
        const shouldRefresh = getShouldRefresh();

        if (existingToken) {
          setAccessTokenState(existingToken); // Update state from localStorage
        } else if (shouldRefresh) {
          // If no token exists, but flag is set, try to get a new one
          const response = await refreshToken();
          setAccessToken(response.data.access);
        }
      } catch {
        setAccessToken("");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  // Periodically fetch user details
  useEffect(() => {
    // Only set up interval if we have an access token
    if (!accessToken) return;

    // Initial fetch
    fetchUserDetails();

    // Set up periodic fetching (every 5 minutes)
    const intervalId = setInterval(() => {
      fetchUserDetails();
    }, 5 * 60 * 1000);

    // Clean up the interval on unmount or when accessToken changes
    return () => clearInterval(intervalId);
  }, [accessToken, hasCheckedSubscription]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // Always get the latest token from localStorage
        const token = !config._retry && getAccessToken();
        config.headers.Authorization =
          token
            ? `Bearer ${token}`
            : config.headers.Authorization;
        return config;
      }
    );

    /**
     * Handling the case where the app refreshed and only the new access token is retrieved via tha refreshToken API call.
     * The initial fetch is now handled by the separate useEffect that depends on accessToken.
     */

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        const isRefreshTokenEndpoint =
          originalRequest.url?.includes("auth/refresh");
        
        // If refresh token endpoint is giving 401, then do not try to refresh the token
        if (!isRefreshTokenEndpoint && error.response && (error.response.status === 403 || error.response.status === 401)) {
          // If there's no refresh in progress, start one
          if (!refreshPromiseRef.current) {
            refreshPromiseRef.current = (async () => {
              try {
                const response = await refreshToken();
                const newToken = response.data.access;
                
                // Store the new token in localStorage and update state
                setAccessToken(newToken);
                
                return newToken;
              } catch (refreshError) {
                // Clear both localStorage and state on refresh failure
                setAccessToken("");
                setCurrentUser(initialUser);
                // Clear user quota cache on logout
                invalidateUserQuotaData(queryClient);
                
                throw refreshError;
              } finally {
                // Always clear the promise when done (success or failure)
                refreshPromiseRef.current = null;
              }
            })();
          }

          // Wait for the refresh to complete
          try {
            const newToken = await refreshPromiseRef.current;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            originalRequest._retry = true;
            return api(originalRequest);
          } catch {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  // Listen for storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN_KEY) {
        if (!event.newValue) {
          setAccessTokenState("");
          setCurrentUser(initialUser);
        } else if (event.newValue !== accessToken) {
          setAccessTokenState(event.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [accessToken]);

  return (
    <userAuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        currentUser,
        setCurrentUser,
        fetchUserDetails,
        loading,
        needsSubscription,
        dueDate: currentUser.dueDate || "",
        logoutUser,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export { AuthProvider as default, AuthProvider, userAuthContext };

export const useAuth = () => {
  const context = useContext(userAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserAuthContextProvider');
  }
  return context;
};
