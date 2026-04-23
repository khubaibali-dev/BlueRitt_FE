import React from "react";
import { useLocation } from "react-router-dom";
import ProfileInformation from "./components/ProfileInformation";
import AdditionalInformation from "./components/AdditionalInformation";
import ChangePassword from "./components/ChangePassword";
import Subscription from "./components/Subscription";
import Invoices from "./components/Invoices";
import AddonsBalanceHistory from "./components/AddonsBalanceHistory";
import Plans from "./components/Plans";

const SettingsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab");

  // Determine if a section should be open by default
  // If no tab is specified, Profile is open by default
  const isProfileOpen = !activeTab || activeTab === "profile";
  const isSecurityOpen = activeTab === "security";
  const isSubscriptionOpen = activeTab === "subscription";
  const isPlanOpen = activeTab === "plan";
  const isBillingOpen = activeTab === "billing";

  return (
    <div className="help-page-container">
      {/* Header Section */}
      <div className="max-w-[1200px] w-full mx-auto mb-4 text-left">
        <h1 className="page-header-title !mb-0 !font-normal !text-[24px] mt-8">Settings</h1>
        <p className="tool-fusion-subtitle ">
          Manage your account, preferences, and subscription
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col gap-6 max-w-[1200px] w-full mx-auto">
        <ProfileInformation defaultOpen={isProfileOpen} scrollIntoViewOnOpen={isProfileOpen} />
        <AdditionalInformation defaultOpen={isProfileOpen} />
        <ChangePassword defaultOpen={isSecurityOpen} scrollIntoViewOnOpen={isSecurityOpen} />
        <Subscription defaultOpen={isSubscriptionOpen} scrollIntoViewOnOpen={isSubscriptionOpen} />
        <Invoices defaultOpen={isBillingOpen} scrollIntoViewOnOpen={isBillingOpen} />
        <AddonsBalanceHistory defaultOpen={isBillingOpen} scrollIntoViewOnOpen={isBillingOpen} />
        <Plans defaultOpen={isPlanOpen} scrollIntoViewOnOpen={isPlanOpen} />
      </div>
    </div>
  );
};

export default SettingsPage;
