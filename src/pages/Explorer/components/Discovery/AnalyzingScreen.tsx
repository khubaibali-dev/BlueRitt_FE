import React from "react";
import badgeImg from "../../../../assets/images/Badge.png";
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
          style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-12 w-full max-w-2xl px-6">
        {!isDetailed ? (
          <div className="space-y-4">
            <h2 className="text-[28px] sm:text-[32px] text-white tracking-tight font-semibold italic leading-snug">
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
        <button
          // onClick={onCancel}
          className="w-fit bg-blur text-white px-8 py-3 !rounded-full text-xs font-semibold figma-pill-border transition-all tracking-[0.2em] relative flex items-center gap-3 hover:bg-white/5 active:scale-95"
        >
          <img src={aiIcon} alt="" className="w-5 h-5 object-contain animate-spin duration-[4000ms]" />
          <span className="text-white text-[14px] font-medium tracking-wide">
            Scanning trends....
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
