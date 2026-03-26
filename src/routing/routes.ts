import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/Layout";

const LoginPage = lazy(() => import("../pages/UserAuth/Login"));
const SignupPage = lazy(() => import("../pages/UserAuth/SignUp/SignupForm"));
const SelectPlanPage = lazy(() => import("../pages/UserAuth/SelectPlan/SelectPlanPage"));
const VerifyOTPPage = lazy(() => import("../pages/UserAuth/VerifyOTP"));
const DashboardPage = lazy(() => import("../pages/Dashboard"));
const ExplorerPage = lazy(() => import("../pages/Explorer"));
const ToolFusionPage = lazy(() => import("../pages/ToolFusion"));
const HelpSupportPage = lazy(() => import("../pages/HelpSupport"));
const SettingsPage = lazy(() => import("../pages/Settings"));
const AddOnsPage = lazy(() => import("../pages/AddOns"));
const ProfitCalculatorPage = lazy(() => import("../pages/ProfitCalculator"));
const ProductVaultPage = lazy(() => import("../pages/ProductVault"));
const TikTokTrendsPage = lazy(() => import("../pages/SocialPulse/TiktokTrends/TikTokTrends"));
const AmazonTrendsPage = lazy(() => import("../pages/SocialPulse/AmazonTrends/AmazonTrends"));
const InfluencerLinkPage = lazy(() => import("../pages/SocialPulse/InfluencerLink/InfluencerLink"));

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
  {
    path: "/explorer",
    element: ExplorerPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/toolfusion",
    element: ToolFusionPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/help",
    element: HelpSupportPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/settings",
    element: SettingsPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/addons",
    element: AddOnsPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/profit-calculator",
    element: ProfitCalculatorPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/products",
    element: ProductVaultPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/tiktok-trends",
    element: TikTokTrendsPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/amazon-trends",
    element: AmazonTrendsPage,
    layout: DashboardLayout,
    isProtected: false,
  },
  {
    path: "/influencer-link",
    element: InfluencerLinkPage,
    layout: DashboardLayout,
    isProtected: false,
  },
];

export { routes, type RouteType };
