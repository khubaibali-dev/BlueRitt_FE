import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export const useInactivityTimeout = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setCurrentUser } = useAuth();
  const lastActivityTimeRef = useRef(Date.now());
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const performLogout = useCallback(async () => {
    const inactiveTime = Date.now() - lastActivityTimeRef.current;
    console.log(
      `[Inactivity Monitor] User has been inactive for ${Math.round(
        inactiveTime / 1000
      )} seconds. Logging out...`
    );

    // 1. Clear authentication data from context
    setAccessToken("");
    setCurrentUser({
      firstName: "",
      lastName: "",
      fullName: "",
      email: "",
      phone: "",
      country: "",
      searchQuota: undefined,
      subscriptionStatus: undefined,
      dueDate: "",
    });

    // 2. Call the logout API
    try {
      await logout();
    } catch (err) {
      console.error("Logout API failed", err);
    }

    // 3. Clear all cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    // 4. Clear localStorage
    localStorage.clear();

    // 5. Redirect to login page
    navigate("/login");
  }, [navigate, setAccessToken, setCurrentUser]);

  const resetTimeout = useCallback(() => {
    if (!accessToken) return;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      performLogout();
    }, INACTIVITY_TIMEOUT);
  }, [accessToken, performLogout]);

  const handleActivity = useCallback(() => {
    lastActivityTimeRef.current = Date.now();
    resetTimeout();
  }, [resetTimeout]);

  useEffect(() => {
    if (!accessToken) return;

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    resetTimeout();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [accessToken, handleActivity, resetTimeout]);
};
