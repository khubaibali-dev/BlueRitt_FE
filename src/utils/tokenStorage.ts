// src/utils/tokenStorage.ts

export const ACCESS_TOKEN_KEY = "blueritt_access_token";

export const storeAccessToken = (token: string): void => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
};

export const clearAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const hasAccessToken = (): boolean => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
};
