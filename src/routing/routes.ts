import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

const LoginPage = lazy(() => import("../pages/UserAuth/Login"));
const SignupPage = lazy(() => import("../pages/UserAuth/SignUp/SignupForm"));
const SelectPlanPage = lazy(() => import("../pages/UserAuth/SelectPlan/SelectPlanPage"));
const VerifyOTPPage = lazy(() => import("../pages/UserAuth/VerifyOTP"));
const DashboardPage = lazy(() => import("../pages/Dashboard"));

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
  {
    path: "/select-plan",
    element: SelectPlanPage,
    layout: AuthLayout,
    isProtected: false,
  },
  {
    path: "/verify-otp",
    element: VerifyOTPPage,
    layout: AuthLayout,
    isProtected: false,
  },
  {
    path: "/dashboard",
    element: DashboardPage,
    layout: DashboardLayout,
    isProtected: false, // Set to true if you have auth guard
  },
];

export { routes, type RouteType };
