// src/utils/tokenStorage.ts

export const ACCESS_TOKEN_KEY = "blueritt_access_token";
export const SHOULD_REFRESH_KEY = "blueritt_should_refresh";

export const storeAccessToken = (token: string): void => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(SHOULD_REFRESH_KEY, "true");
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(SHOULD_REFRESH_KEY);
  }
};

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};

export const setShouldRefresh = (value: boolean): void => {
  if (value) {
    localStorage.setItem(SHOULD_REFRESH_KEY, "true");
  } else {
    localStorage.removeItem(SHOULD_REFRESH_KEY);
  }
};

export const getShouldRefresh = (): boolean => {
  return localStorage.getItem(SHOULD_REFRESH_KEY) === "true";
};

export const clearAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const hasAccessToken = (): boolean => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
};
