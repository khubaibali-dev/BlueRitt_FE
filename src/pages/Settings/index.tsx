import React from "react";
import { useLocation } from "react-router-dom";
import ProfileInformation from "./components/ProfileInformation";
import AdditionalInformation from "./components/AdditionalInformation";
import ChangePassword from "./components/ChangePassword";
import Subscription from "./components/Subscription";
import Invoices from "./components/Invoices";
import AddonsBalanceHistory from "./components/AddonsBalanceHistory";
import Plans from "./components/Plans";
import PageHeader from "../../components/common/PageHeader/PageHeader";

const SettingsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab")?.toLowerCase();

  // Determine if a section should be open by default
  // If no tab is specified, Profile is open by default
  const isProfileOpen = !activeTab || activeTab === "profile";
  const isSecurityOpen = activeTab === "security";
  const isSubscriptionOpen = activeTab === "subscription";
  const isPlanOpen = activeTab === "plan" || activeTab === "plans";
  const isBillingOpen = activeTab === "billing";

  React.useEffect(() => {
    if (activeTab === "plan") {
      const timer = setTimeout(() => {
        const el = document.getElementById("plans-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <div className="help-page-container">
      {/* Header Section */}
      <PageHeader
        title="Settings"
        subtitle="Manage your account, preferences, and subscription"
        className="mt-6"
      />

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
