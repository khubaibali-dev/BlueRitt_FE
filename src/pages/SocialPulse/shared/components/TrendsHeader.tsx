import React from "react";

interface TrendsHeaderProps {
  title: string;
  subtitle: string;
}

const TrendsHeader: React.FC<TrendsHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 group">
      <div className="flex flex-col gap-1">
        <h1 className="text-[20px] sm:text-[32px] text-white tracking-tight leading-tight group-hover:text-blue-400/90 transition-colors duration-500">
          {title}
        </h1>
        <p className="text-[14px] text-[#FFFFFF99]">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TrendsHeader;
