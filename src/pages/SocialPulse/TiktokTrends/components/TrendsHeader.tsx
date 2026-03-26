import React from "react";

interface TrendsHeaderProps {
  title: string;
  subtitle: string;
}

const TrendsHeader: React.FC<TrendsHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] sm:text-[32px] text-white tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-[14px] text-slate-400 font-medium">
          {subtitle}
        </p>
      </div>


    </div>
  );
};

export default TrendsHeader;
