import React from "react";
import badgeImg from "../../../assets/images/Badge.png";
import aiIcon from "../../../assets/images/Icon.png";
import starImg from "../../../assets/images/star.png";

interface AnalyzingScreenProps {
  onCancel?: () => void;
}

const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onCancel }) => {
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

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">

        <h2 className="text-[28px] sm:text-[36px] font-medium text-white tracking-tight leading-snug max-w-[100%]">
          Analysing your search with the AI..
        </h2>
        {/* Red circle with star icon - as seen in screenshot */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0   rounded-full scale-150" />
          <div className="rounded-full  flex items-center justify-center relative z-10 shadow-lg">
            <img src={starImg} alt="" className="w-14 h-14 object-contain" />
          </div>
        </div>

        {/* Scanning Trends Pill - gradient border + blur only bg */}
        <button
          onClick={onCancel}
          className="w-full sm:w-fit px-4 sm:px-3 mt-4 bg-blur text-white py-3 sm:py-1 !rounded-full text-[10px] sm:text-xs font-semibold figma-pill-border  transition-all tracking-[0.2em] relative block text-center sm:text-left"
        >
          <div className=" rounded-full flex items-center gap-3 px-8 py-3 cursor-pointer ">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <img src={aiIcon} alt="" className="w-5 h-5 object-contain animate-spin duration-[4000ms]" />
            </div>
            <span className="text-white text-[15px] font-medium tracking-wide">
              Scanning trends....
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AnalyzingScreen;
