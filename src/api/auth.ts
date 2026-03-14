// src/api/auth.ts
import api from ".";

export const login = ({
  email,
  password,
  recaptchaToken,
}: {
  email: string;
  password: string;
  recaptchaToken: string | null;
}) => {
  return api.post("/auth/login/", {
    email,
    password,
    recaptcha_token: recaptchaToken,
  });
};

export const refreshToken = () => {
  return api.post("/auth/refresh/");
};

export const logout = () => {
  return api.post("/auth/logout/");
};
