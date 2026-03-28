import React from "react";

interface InfluencerHeaderProps {
  title: string;
  subtitle: string;
}

const InfluencerHeader: React.FC<InfluencerHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <h1 className="text-[20px] sm:text-[32px] text-white tracking-tight leading-tight">
        {title}
      </h1>
      <p className="text-[14px] text-[#FFFFFF99]">
        {subtitle}
      </p>
    </div>
  );
};

export default InfluencerHeader;
