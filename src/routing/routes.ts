import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = lazy(() => import("../pages/UserAuth/Login"));
const SignupPage = lazy(() => import("../pages/UserAuth/SignUp/SignupForm"));

type RouteType = {
  path: string;
  element?: React.LazyExoticComponent<React.ComponentType<any>>;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  isProtected?: boolean;
  children?: RouteType[];
};

const routes: RouteType[] = [
  {
    path: "/",
    element: LoginPage,
    layout: AuthLayout,
    isProtected: false,
  },
  {
    path: "/signup",
    element: SignupPage,
    layout: AuthLayout,
    isProtected: false,
  },
];

export { routes, type RouteType };
