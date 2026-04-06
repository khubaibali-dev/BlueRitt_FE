import React from "react";
import badgeImg from "../../../../assets/images/Badge.png";
import explorerLoading from "../../../../assets/images/ExplorerLoading.png";
import aiIcon from "../../../../assets/images/Icon.png";
import DetailedSkeletonLoader from "./DetailedSkeletonLoader";

interface AnalyzingScreenProps {
  isDetailed?: boolean;
}

const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ isDetailed = false }) => {
  return (
    <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center overflow-hidden rounded-[32px] animate-in fade-in duration-700 bg-brand-card-alt">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src={badgeImg}
          alt=""
          className="w-full h-full object-fill hidden dark:block"
        />
        <img
          src={explorerLoading}
          alt=""
          className="w-full h-full object-fill block dark:hidden"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-12 w-full max-w-2xl px-6">
        {!isDetailed ? (
          <div className="space-y-4">
            <h2 className="text-[28px] sm:text-[32px] text-brand-textPrimary tracking-tight font-semibold italic leading-snug">
              Analyzing your search with AI...
            </h2>
          </div>
        ) : (
          /* New Detailed Progress Loader */
          <div className="w-full">
            <DetailedSkeletonLoader isLoading={true} />
          </div>
        )}

        {/* Scanning Trends Pill */}
        <div
          className="w-fit bg-brand-inputBg text-brand-textPrimary px-8 py-3 !rounded-full text-xs font-semibold shadow-xl transition-all tracking-[0.2em] relative flex items-center gap-3 active:scale-95 border border-brand-border"
        >
          <img src={aiIcon} alt="" className="w-5 h-5 object-contain animate-spin duration-[4000ms]" />
          <span className="text-[14px] font-medium tracking-wide">
            Scanning trends....
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
