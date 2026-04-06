import React from "react";
import { Link } from "react-router-dom";
import Banner from "./components/Banner";
import QuickActions from "./components/QuickActions";
import SubscriptionSnapshot from "./components/SubscriptionSnapshot";
import AccountSettings from "./components/AccountSettings";
import RecentSearches from "./components/RecentSearches";
import TikTokHashtags from "./components/TikTokHashtags";

const DashboardPage: React.FC = () => {

  return (
    <div className="dashboard-container relative min-h-screen bg-brand-bg  lg:p-1">
      <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-md">
        <div className="pb-12">
          {/* Banner Section */}
          <Banner />

          <div className="px-4 sm:px-6 lg:px-10 space-y-8 sm:space-y-12 -mt-12 sm:-mt-20 relative z-10">
            {/* Quick Actions */}
            <div className="mt-6 sm:mt-0">
              <QuickActions />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-5 items-stretch">
              <div className="xl:col-span-2 flex flex-col mt-8">
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Subscription Snapshot</h3>
                </div>
                <SubscriptionSnapshot />
                <Link
                  to="/settings?tab=subscription"
                  className="w-full sm:w-fit px-8 sm:px-12 mt-6 text-brand-textPrimary bg-brand-inputBg figma-pill-border py-3.5 sm:py-4 !rounded-full text-[14px] sm:text-xs font-semibold border border-brand-border hover:bg-brand-hover transition-all tracking-[0.2em] relative block text-center"
                >
                  Fill Balance for Add-ons
                </Link>
              </div>
              <div className="flex flex-col h-full mt-2 xl:mt-0">
                <div className="dashboard-card-header mt-8">
                  <h3 className="dashboard-card-title">Account Settings</h3>
                </div>
                <div className="flex-1">
                  <AccountSettings />
                </div>
              </div>
            </div>

            {/* Lower Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-5 items-stretch pt-2">
              <div className="xl:col-span-2 flex flex-col">
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Recent Searches</h3>
                </div>
                <div className="flex-1">
                  <RecentSearches />
                </div>
              </div>
              <div className="flex flex-col mt-2 xl:mt-0">
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Recent TikTok Hashtags</h3>
                </div>
                <div className="flex-1">
                  <TikTokHashtags />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
