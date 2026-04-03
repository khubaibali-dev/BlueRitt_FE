// src/pages/Settings/index.tsx
import React from "react";
import ProfileInformation from "./components/ProfileInformation";
import AdditionalInformation from "./components/AdditionalInformation";
import ChangePassword from "./components/ChangePassword";
import Subscription from "./components/Subscription";
import Invoices from "./components/Invoices";
import AddonsBalanceHistory from "./components/AddonsBalanceHistory";
import Plans from "./components/Plans";

const SettingsPage: React.FC = () => {
  return (
    <div className="help-page-container">
      {/* Header Section */}
      <div className="max-w-[1000px] mb-4 text-left">
        <h1 className="text-[20px] md:text-[32px]  text-white tracking-tight">Settings</h1>
        <p className="text-[14px] md:text-[16px] text-[#FFFFFF99] mt-1">
          Manage your account, preferences, and subscription
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col gap-6 max-w-[1000px] w-full">
        <ProfileInformation />
        <AdditionalInformation />
        <ChangePassword />
        <Subscription />
        <Invoices />
        <AddonsBalanceHistory />
        <Plans />
      </div>
    </div>
  );
};

export default SettingsPage;
