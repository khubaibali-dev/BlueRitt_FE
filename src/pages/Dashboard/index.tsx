
import React from "react";
import Banner from "./components/Banner";
import QuickActions from "./components/QuickActions";
import SubscriptionSnapshot from "./components/SubscriptionSnapshot";
import AccountSettings from "./components/AccountSettings";
import RecentSearches from "./components/RecentSearches";
import TikTokHashtags from "./components/TikTokHashtags";

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-2xl">
      <div className="pb-12">
        {/* Banner Section */}
        <Banner />

        <div className="px-4 sm:px-6 lg:px-10 space-y-8 sm:space-y-12 mt-6 sm:mt-8">
          {/* Quick Actions */}
          <QuickActions />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10 items-stretch">
            <div className="xl:col-span-2 flex flex-col">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-widest uppercase">Subscription Snapshot</h3>
              </div>
              <SubscriptionSnapshot />
              <button className="w-full sm:w-fit px-8 sm:px-12 mt-6 bg-[#020817] text-white py-3.5 sm:py-4 !rounded-full text-[11px] sm:text-xs font-semibold figma-pill-border hover:bg-white/5 transition-all tracking-[0.2em] relative block text-center">
                Fill Balance for Add-ons
              </button>
            </div>
            <div className="flex flex-col h-full mt-2 xl:mt-0">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-widest uppercase">Account Settings</h3>
              </div>
              <div className="flex-1">
                <AccountSettings />
              </div>
            </div>
          </div>

          {/* Lower Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10 items-stretch pt-2">
            <div className="xl:col-span-2 flex flex-col">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-widest uppercase">Recent Searches</h3>
              </div>
              <div className="flex-1">
                <RecentSearches />
              </div>
            </div>
            <div className="flex flex-col mt-2 xl:mt-0">
              <div className="mb-4 sm:mb-6 flex justify-between items-center">
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-widest uppercase">Recent TikTok Hashtags</h3>
                <span className="bg-[#1E293B] text-white text-[10px] px-2 py-0.5 rounded-md font-semibold border border-white/5 opacity-80">Pakistan</span>
              </div>
              <div className="flex-1">
                <TikTokHashtags />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
