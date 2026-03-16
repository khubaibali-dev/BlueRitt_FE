
import React from "react";
import Banner from "./components/Banner";
import QuickActions from "./components/QuickActions";
import SubscriptionSnapshot from "./components/SubscriptionSnapshot";
import AccountSettings from "./components/AccountSettings";
import RecentSearches from "./components/RecentSearches";
import TikTokHashtags from "./components/TikTokHashtags";

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12 overflow-x-hidden">
      {/* Banner Section */}
      <Banner />

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        <div className="xl:col-span-2 flex flex-col">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-white tracking-widest ">Subscription Snapshot</h3>
          </div>
          <SubscriptionSnapshot />
          <button className="w-full sm:w-fit px-8 sm:px-12 mt-4 bg-[#020817] text-white py-3 sm:py-4 !rounded-full text-[10px] sm:text-xs font-semibold figma-card-border hover:bg-[#020817]/80 transition-all tracking-[0.2em] relative block text-center sm:text-left">
            Fill Balance for Add-ons
          </button>
        </div>
        <div className="flex flex-col h-full mt-4 xl:mt-0">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-white tracking-widest ">Account Settings</h3>
          </div>
          <div className="flex-1">
            <AccountSettings />
          </div>
        </div>
      </div>

      {/* Lower Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch mt-8 sm:mt-12">
        <div className="xl:col-span-2 flex flex-col">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-white tracking-widest ">Recent Searches</h3>
          </div>
          <div className="flex-1">
            <RecentSearches />
          </div>
        </div>
        <div className="flex flex-col mt-4 xl:mt-0">
          <div className="mb-4 sm:mb-6 flex justify-between items-center">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-white tracking-widest ">Recent TikTok Hashtags</h3>
            <span className="bg-[#1E293B] text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-semibold border border-white/5">Pakistan</span>
          </div>
          <div className="flex-1">
            <TikTokHashtags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
