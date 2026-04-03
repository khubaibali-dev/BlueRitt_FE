// src/api/auth.ts
import api from ".";

export const signup = ({
  firstName,
  lastName,
  email,
  country,
  plan,
  phone,
  password,
  confirmPassword,
  billingType,
  recaptchaToken,
}: {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  plan: string;
  phone: string;
  password: string;
  confirmPassword: string;
  billingType: string;
  recaptchaToken: string;
}) => {
  return api.post(`/auth/register/`, {
    email,
    password,
    confirm_password: confirmPassword,
    recaptcha_token: recaptchaToken,
    profile: {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      country: country,
      plan: plan,
      billing_type: billingType,
    },
  });
};

export const quickSignup = ({
  firstName,
  lastName,
  email,
  country,
  plan,
  password,
  confirmPassword,
  billingType
}: {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  plan: string;
  password: string;
  confirmPassword: string;
  billingType: string;
}) => {
  return api.post(`/auth/quick-register/`, {
    email: email,
    password: password,
    confirm_password: confirmPassword,
    profile: {
      first_name: firstName,
      last_name: lastName,
      country: country,
      plan: plan,
      billing_type: billingType,
    },
  });
};

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

export const forgotPassword = ({ email, recaptchaToken }: { email: string, recaptchaToken: string }) => {
  return api.post(`/auth/forgot-password/`, {
    email: email,
    recaptcha_token: recaptchaToken,
  });
};

export const verifyOTP = ({ email, otp }: { email: string; otp: string }) => {
  return api.post(`/auth/verify-otp/`, {
    email: email,
    otp: otp,
  });
};

export const updatePassword = ({
  current_password,
  new_password,
  confirm_password,
}: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}) => {
  return api.post(`/auth/update-password/`, {
    current_password,
    new_password,
    confirm_password,
  });
};

export const resetPassword = ({
  newPassword,
  otp,
}: {
  newPassword: string;
  otp: string;
}) => {
  return api.post(`/auth/reset-password/`, {
    password: newPassword,
    otp: otp,
  });
};

export const getUserDetails = () => {
  return api.get(`/auth/me/`);
};

export const logout = () => {
  return api.post("/auth/logout/");
};

export const startSubscription = ({
  token,
  email,
  packageSlug,
  subscriptionType,
  billingPeriod,
  stripeCustomerId,
}: {
  token: string;
  email: string;
  packageSlug: string;
  subscriptionType: string;
  billingPeriod: string;
  stripeCustomerId?: string;
}) => {
  return api.post(`/common/subscription/checkout/`, {
    token: token,
    email: email,
    package: packageSlug,
    subscription_type: subscriptionType,
    billing_period: billingPeriod,
    stripe_customer_id: stripeCustomerId,
  });
};
export const updateUserProfile = (profileData: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
}) => {
  return api.patch(`/auth/me/`, profileData);
};
